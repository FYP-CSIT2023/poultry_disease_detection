# urls.py
from django.urls import path
from .views import PoultryImageUpload
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('uploads/', PoultryImageUpload.as_view(), name='poultry_image_upload'),
    # Add other URL patterns as needed
]

# Add the following line to serve media files during development
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
