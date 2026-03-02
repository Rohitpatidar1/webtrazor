from django.urls import path
from . import views

urlpatterns = [
    # ==========================================
    # 1. AUTHENTICATION
    # ==========================================
    path("admin-login/", views.admin_login, name="admin_login"),
    # ==========================================
    # 2. PUBLIC APIS (WEBSITE)
    # ==========================================
    path("categories/", views.categories, name="categories"),
    path("projects/", views.projects, name="projects"),
    path("projects/<int:id>/", views.project_detail, name="project_detail"),
    path("contact/", views.contact, name="contact_message"),
    # Directory Search (Updated to use providers_list)
    path(
        "providers/<path:service>/<str:location>/",
        views.providers_list,
        name="providers_list",
    ),
    # ==========================================
    # 3. USER SUBMISSIONS / DUAL PURPOSE
    # ==========================================
    path("request/service/", views.service_request, name="service_request"),
    path("request/build/", views.build_request, name="build_request"),
    path("feedback/", views.send_feedback, name="feedback_handle"),
    # ==========================================
    # 4. ADMIN SECURE ACTIONS (TOKEN REQUIRED)
    # ==========================================
    # Dashboard Stats & Latest Data
    path("admin/dashboard-stats/", views.dashboard_stats, name="dashboard_stats"),
    # Project Management
    path("upload-project/", views.upload_project, name="upload_project"),
    path(
        "project/update-full/<int:project_id>/",
        views.update_project_with_media,
        name="update_project_full",
    ),
    # Service Provider Management
    path("add-provider/", views.add_provider, name="add_provider"),
    # ==========================================
    # 5. DELETE OPERATIONS (GENERIC OR SPECIFIC)
    # ==========================================
    # Using the generic delete view from cleaned views.py
    # path("delete/<str:model_name>/<int:pk>/", views.delete_generic, name="delete_generic"),
    # OR if you prefer specific URLs as per your previous setup:
    path(
        "admin/delete-feedback/<int:pk>/",
        views.delete_generic,
        {"model_name": "feedback"},
    ),
    path(
        "admin/delete-build-request/<int:pk>/",
        views.delete_generic,
        {"model_name": "build"},
    ),
    path(
        "admin/delete-service-request/<int:pk>/",
        views.delete_generic,
        {"model_name": "service"},
    ),
    path("project/delete/<int:pk>/", views.delete_generic, {"model_name": "project"}),
    path(
        "project/media/delete/<int:pk>/", views.delete_generic, {"model_name": "media"}
    ),
    # Dashboard/Frontend missing paths jo 404 de rahe hain:
    path("latest-projects/", views.latest_projects, name="latest_projects"),
    path("latest-build-requests/", views.build_request, name="latest_build_requests"),
    # Agar frontend latest-services bhi dhoond raha hai:
    path(
        "latest-service-requests/",
        views.service_request,
        name="latest_service_requests",
    ),
    path("tech/", views.ProjectListCreateView.as_view(), name="project-list-create"),
]
