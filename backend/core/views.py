from django.db.models import Q
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt

from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAdminUser, AllowAny, IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication

from .models import *
from .serializers import *

# ==========================================
# 1. AUTHENTICATION
# ==========================================

@api_view(['POST'])
@permission_classes([AllowAny])
def admin_login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    
    if user and user.is_staff:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            "token": token.key,
            "status": True,
            "message": "Login successful"
        })
    return Response({"error": "Invalid Credentials or Not an Admin"}, status=400)


# ==========================================
# 2. PUBLIC APIS (FOR WEBSITE)
# ==========================================

@api_view(["GET"])
def categories(request):
    parents = Category.objects.filter(parent__isnull=True)
    return Response(CategoryTreeSerializer(parents, many=True).data)

@api_view(["GET"])
def projects(request):
    qs = Project.objects.all().order_by("-id")
    category = request.GET.get("category")
    subcategory = request.GET.get("subcategory")
    location = request.GET.get("location")
    search = request.GET.get("search")

    if category: qs = qs.filter(category__parent__name__icontains=category)
    if subcategory: qs = qs.filter(category__name__icontains=subcategory)
    if location: qs = qs.filter(location__icontains=location)
    if search: qs = qs.filter(Q(title__icontains=search) | Q(description__icontains=search))

    return Response(ProjectSerializer(qs, many=True).data)

@api_view(["GET"])
def project_detail(request, id):
    try:
        project = Project.objects.get(id=id)
        return Response(ProjectSerializer(project).data)
    except Project.DoesNotExist:
        return Response({"error":"Project not found"}, status=404)

@api_view(["GET"])
def latest_projects(request):
    qs = Project.objects.order_by("-id")[:6]
    return Response(ProjectSerializer(qs, many=True).data)

@api_view(["POST"])
def contact(request):
    s = ContactSerializer(data=request.data)
    if s.is_valid():
        s.save()
        return Response({"status": True, "msg":"Message Sent"})
    return Response(s.errors, status=400)

@api_view(["GET"])
@permission_classes([AllowAny])
def providers_list(request, service, location):
    # .strip() removes accidental spaces from the beginning or end
    clean_service = service.strip()
    clean_location = location.strip()

    data = ServiceProvider.objects.filter(
        service_type__icontains=clean_service, 
        location__icontains=clean_location
    )
    return Response(ProviderSerializer(data, many=True).data)
# ==========================================
# 3. DUAL-PURPOSE (USER POST / ADMIN GET)
# ==========================================

@api_view(["GET", "POST"])
@csrf_exempt
def service_request(request):
    if request.method == "GET":
        requests = ServiceRequest.objects.all().order_by("-id")
        # Serializer poora data return karega including client_name
        return Response(ServiceRequestSerializer(requests, many=True).data)

    if request.method == "POST":
        serializer = ServiceRequestSerializer(data=request.data)
        if serializer.is_valid():
            # 1. Data ko save karein
            obj = serializer.save()
            
            # 2. Matching providers dhoondein (Field name: service_type)
            # Make sure aapke ServiceProvider model mein 'service_type' field ho
            providers = ServiceProvider.objects.filter(
                service_type__icontains=obj.service_type,
                location__icontains=obj.location
            )
            
            # 3. Response mein Saved Data + Providers dono bhejein
            return Response({
                "status": True,
                "message": "Request submitted successfully",
                "data": ServiceRequestSerializer(obj).data, # Yeh client_name show karega
                "providers": ProviderSerializer(providers, many=True).data
            })
        
        # Agar validation fail ho jaye
        return Response(serializer.errors, status=400)
    
@csrf_exempt
@api_view(["GET", "POST"])
def build_request(request):
    if request.method == "GET":
        requests = BuildRequest.objects.all().order_by("-id")
        return Response(BuildRequestSerializer(requests, many=True).data)

    if request.method == "POST":
        serializer = BuildRequestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": True, "message": "Submitted"})
        return Response(serializer.errors, status=400)

# FIXED: Feedback handle API (urls.py needs this)
@api_view(["GET", "POST"])
def send_feedback(request):
    if request.method == "GET":
        feedbacks = Feedback.objects.all().order_by("-id")
        return Response(FeedbackSerializer(feedbacks, many=True).data)

    if request.method == "POST":
        s = FeedbackSerializer(data=request.data)
        if s.is_valid():
            s.save()
            return Response({"status": True, "msg": "Feedback submitted"})
        return Response(s.errors, status=400)


# ==========================================
# 4. SECURE ADMIN ACTIONS
# ==========================================

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAdminUser])
def upload_project(request):
    serializer = ProjectCreateSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Project uploaded!", "status": True}, status=201)
    return Response(serializer.errors, status=400)

@csrf_exempt
@api_view(['PATCH', 'PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAdminUser])
def update_project_with_media(request, project_id):
    try:
        project = Project.objects.get(id=project_id)
        data = request.data
        
        # 1. Basic Details Update
        project.title = data.get('title', project.title)
        project.client_name = data.get('client_name', project.client_name)
        project.location = data.get('location', project.location)
        project.description = data.get('description', project.description)
        if data.get('category'): project.category_id = data.get('category')
        project.save()

        # 2. Media Sync (Important for Delete/Update)
        new_images = data.get('images', [])
        
        # Agar user naye images ki list bhej raha hai, toh purani hatani hongi
        # Warning: Ye tabhi karein agar frontend poori updated list bhej raha hai
        if 'images' in data:
            project.media.filter(type='image').delete() # Purane delete
            for url in new_images:
                ProjectMedia.objects.create(project=project, file=url, type='image')

        # 3. Video Sync
        new_video = data.get('video', None)
        if new_video:
            project.media.filter(type='video').delete()
            ProjectMedia.objects.create(project=project, file=new_video, type='video')
        elif new_video == "":
            project.media.filter(type='video').delete()

        return Response({"message": "Project and Media updated successfully", "status": True})
    except Project.DoesNotExist:
        return Response({"error": "Project not found"}, status=404)

@api_view(['GET', 'POST']) # Dono allow karein testing ke liye
@permission_classes([AllowAny]) # Filhal testing ke liye AllowAny
def add_provider(request):
    if request.method == 'GET':
        providers = ServiceProvider.objects.all().order_back('-id')
        serializer = ProviderSerializer(providers, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = ProviderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Provider added!", "status": True}, status=201)
        
        # Agar error aaye toh terminal aur response dono mein dikhega
        print("Validation Errors:", serializer.errors) 
        return Response(serializer.errors, status=400)

@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAdminUser])
def delete_generic(request, model_name, pk):
    models_map = {
        'project': Project,
        'feedback': Feedback,
        'build': BuildRequest,
        'service': ServiceRequest,
        'media': ProjectMedia
    }
    model = models_map.get(model_name)
    if not model: return Response({"error": "Invalid model"}, status=400)
    
    try:
        obj = model.objects.get(pk=pk)
        obj.delete()
        return Response({"status": True, "message": "Deleted"})
    except:
        return Response({"error": "Not found"}, status=404)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAdminUser])
def dashboard_stats(request):
    try:
        # Counts for Dashboard Cards
        stats = {
            "projects_count": Project.objects.count(),
            "build_requests_count": BuildRequest.objects.count(),
            "service_requests_count": ServiceRequest.objects.count(),
            "feedback_count": Feedback.objects.count(),
            
            # Frontend key 'recent_projects' ya 'latest_projects' jo bhi aapka UI dhoond raha ho
            "latest_projects": ProjectSerializer(
                Project.objects.all().order_by('-id')[:5], 
                many=True
            ).data,
            
            # Website build requests
            "latest_builds": BuildRequestSerializer(
                BuildRequest.objects.all().order_by('-id')[:5], 
                many=True
            ).data,

            # General Service requests (Latest Service Table)
            "latest_services": ServiceRequestSerializer(
                ServiceRequest.objects.all().order_by('-id')[:5], 
                many=True
            ).data
        }
        return Response(stats)
    except Exception as e:
        return Response({"error": str(e)}, status=500)