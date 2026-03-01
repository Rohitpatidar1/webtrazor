from rest_framework import serializers
from .models import *

# --- 1. CATEGORY SERIALIZERS ---
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]

class CategoryTreeSerializer(serializers.ModelSerializer):
    # Category model mein related_name="subcats" hona chahiye
    subcategories = SubCategorySerializer(many=True, read_only=True, source="subcats")

    class Meta:
        model = Category
        fields = ["id", "name", "subcategories"]


# --- 2. PROJECT SERIALIZERS ---
class ProjectMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectMedia
        fields = "__all__"

class ProjectSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.name", read_only=True)
    # parent_category logic
    parent_category = serializers.CharField(source="category.parent.name", default=None, read_only=True)
    media = ProjectMediaSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = [
            "id", "title", "description", "category", "category_name",
            "parent_category", "location", "client_name", "media", "created_at"
        ]
class ProjectCreateSerializer(serializers.ModelSerializer):
    # Cloudinary URLs handling
    images = serializers.ListField(
        child=serializers.URLField(),
        write_only=True,
        required=False
    )
    video = serializers.URLField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = Project
        fields = ["title", "description", "category", "location", "client_name", "images", "video"]

    def create(self, validated_data):
        image_urls = validated_data.pop("images", [])
        video_url = validated_data.pop("video", None)
        
        project = Project.objects.create(**validated_data)
        
        for url in image_urls:
            ProjectMedia.objects.create(project=project, file=url, type="image")
        
        if video_url:
            ProjectMedia.objects.create(project=project, file=video_url, type="video")
            
        return project


# --- 3. DIRECTORY & PROVIDERS ---
from rest_framework import serializers
from .models import *

class ProviderSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceProvider
        fields = '__all__'

    def to_internal_value(self, data):
        # Yeh function frontend ke naye naamo ko backend ke purane naamo se map karega
        new_data = data.copy()
        
        if 'provider_name' in data:
            new_data['name'] = data['provider_name']
        if 'service_name' in data:
            new_data['service_type'] = data['service_name']
        if 'contact_no' in data:
            new_data['phone'] = data['contact_no']
            
        # URL Fix: Agar colon (:) missing hai toh add kar do
        if 'business_url' in data and data['business_url']:
            url = data['business_url']
            if "https//" in url and "https://" not in url:
                new_data['business_url'] = url.replace("https//", "https://")
            elif "http//" in url and "http://" not in url:
                new_data['business_url'] = url.replace("http//", "http://")

        return super().to_internal_value(new_data)

# Baki serializers (Category, Project, etc.) niche waise hi rehne dein...


# --- 4. REQUEST SERIALIZERS ---
class BuildRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = BuildRequest
        fields = "__all__"

class ServiceRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceRequest
        fields = "__all__"


# --- 5. FEEDBACK & CONTACT ---
class FeedbackSerializer(serializers.ModelSerializer):
    project_title = serializers.CharField(source="project.title", read_only=True)

    class Meta:
        model = Feedback
        fields = ["id", "name", "rating", "message", "project", "project_title", "created_at"]

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = "__all__"