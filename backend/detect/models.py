from django.db import models

class PoultryImage(models.Model):
    image = models.ImageField(upload_to='uploads/')
    predicted_class = models.CharField(max_length=255, blank=True)
