from django.contrib import admin
from django import forms
from .models import *

# ---------- 1. MULTI FILE UPLOAD LOGIC ----------

class MultiFileInput(forms.ClearableFileInput):
    allow_multiple_selected = True

class MultiFileField(forms.FileField):
    widget = MultiFileInput
    def clean(self, data, initial=None):
        return data if data else []

class ProjectAdminForm(forms.ModelForm):
    files = MultiFileField(required=False, help_text="Multiple images/videos select karein")
    class Meta:
        model = Project
        fields = "__all__"

# ---------- 2. INLINES ----------

class MediaInline(admin.TabularInline):
    model = ProjectMedia
    extra = 0
    readonly_fields = ["type"]

# ---------- 3. ADMIN CLASSES ----------

class ProjectAdmin(admin.ModelAdmin):
    form = ProjectAdminForm
    list_display = ("title", "category", "location")
    inlines = [MediaInline]

    def save_model(self, request, obj, form, change):
        obj.save()
        files = request.FILES.getlist("files")
        for f in files:
            ProjectMedia.objects.create(project=obj, file=f)

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "category":
            kwargs["queryset"] = Category.objects.filter(parent__isnull=False)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "parent")

class ProviderAdmin(admin.ModelAdmin):
    list_display = ("name", "service_type", "location", "phone")
    list_filter = ("service_type", "location")
    search_fields = ("name", "location")

class BuildRequestAdmin(admin.ModelAdmin):
    list_display = ("business_name", "website_type", "budget", "email", "status", "created_at")
    list_filter = ("status", "website_type")

class ServiceRequestAdmin(admin.ModelAdmin):
    list_display = ('client_name', 'service_type', 'phone', 'location', 'status', 'created_at')
    list_filter = ("status", "service_type")

class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email")

class FeedbackAdmin(admin.ModelAdmin):
    list_display = ("project", "name", "rating", "created_at")

# ---------- 4. REGISTER (ONLY ONCE) ----------

admin.site.register(Project, ProjectAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(ServiceProvider, ProviderAdmin)
admin.site.register(BuildRequest, BuildRequestAdmin)
admin.site.register(ServiceRequest, ServiceRequestAdmin)
admin.site.register(ContactMessage, ContactMessageAdmin)
admin.site.register(Feedback, FeedbackAdmin)
admin.site.register(ProjectMedia) # Optional: Direct access to media