from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/", include("core.urls")), # Make sure 'core' is your app name
]

# Cloudinary use kar rahe hain toh media static ki zaroorat nahi hai, 
# par purani files ke liye ise rehne dena safe hai.
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)