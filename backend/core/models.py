from django.db import models


# ---------- 1. CATEGORY ----------
class Category(models.Model):
    name = models.CharField(max_length=100)
    parent = models.ForeignKey(
        "self", null=True, blank=True, on_delete=models.CASCADE, related_name="subcats"
    )

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        if self.parent:
            return f"{self.parent.name} → {self.name}"
        return self.name


# ---------- 2. PROJECT ----------
class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    location = models.CharField(max_length=150)
    client_name = models.CharField(max_length=150)
    technologies = models.TextField(
        blank=True,
        null=True,
        default="",
        help_text="Comma separated (e.g. React, Python)",
    )
    # In models.py (Sab jagah jahan created_at hai)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return self.title


# core/models.py mein ProjectMedia ko aise update karein
class ProjectMedia(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="media")
    file = models.URLField(max_length=500)  # Ise wapis URLField kar dein
    type = models.CharField(max_length=10, blank=True)

    def save(self, *args, **kwargs):
        if self.file:
            url_lower = str(self.file).lower()
            if any(
                ext in url_lower for ext in [".mp4", ".mov", ".avi", "video/upload"]
            ):
                self.type = "video"
            else:
                self.type = "image"
        super().save(*args, **kwargs)


# ---------- 3. SERVICE PROVIDERS ----------
class ServiceProvider(models.Model):
    # Admin.py ki compatibility ke liye fields ke naam wapis purane rakhe hain
    name = models.CharField(max_length=200)  # Business Name
    service_type = models.CharField(max_length=100)  # e.g., Plumber, Web Design
    phone = models.CharField(max_length=20)
    location = models.CharField(max_length=150)
    business_url = models.URLField(max_length=500, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return f"{self.name} ({self.service_type})"


# ---------- 4. USER REQUESTS ----------


class BuildRequest(models.Model):
    STATUS = (
        ("new", "New"),
        ("contacted", "Contacted"),
        ("in_progress", "In Progress"),
        ("completed", "Completed"),
    )
    business_name = models.CharField(max_length=150)
    website_type = models.CharField(max_length=100)
    details = models.TextField()
    budget = models.CharField(max_length=50)
    email = models.EmailField()
    whatsapp = models.CharField(max_length=20)
    status = models.CharField(max_length=20, choices=STATUS, default="new")
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return self.business_name


class ServiceRequest(models.Model):
    STATUS = (
        ("new", "New"),
        ("assigned", "Assigned"),
        ("completed", "Completed"),
    )
    client_name = models.CharField(max_length=150, null=True, blank=True)
    phone = models.CharField(max_length=20, null=True, blank=True)
    service_type = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    details = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS, default="new")
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return f"{self.service_type} - {self.location}"


# ---------- 5. FEEDBACK & CONTACT ----------


class Feedback(models.Model):
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="feedbacks"
    )
    name = models.CharField(max_length=100)
    message = models.TextField()
    rating = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return f"{self.name} - {self.project.title}"


class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return self.name
