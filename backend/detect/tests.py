from django.test import TestCase

# Create your tests here.
from django.test import TestCase
from django.urls import reverse
from .models import PoultryImage

class PoultryImageUploadTest(TestCase):
    def setUp(self):
        # Create a test image for uploading
        self.image_path = "C:\\Users\\Victus\Desktop\\7th Sem\\poultry_disease_detection\\backend\\media\\uploads\salmo.1001.jpg"
        self.test_image = open(self.image_path, "rb")

    def tearDown(self):
        # Clean up after the test
        self.test_image.close()

    def test_image_upload(self):
        # Upload an image and check if the response is successful
        url = reverse('poultry_image_upload')
        data = {'image': self.test_image}
        response = self.client.post(url, data, format='multipart')

        self.assertEqual(response.status_code, 200)
        self.assertIn('predicted_class', response.json())

    def test_predicted_class_update(self):
        # Upload an image and check if the predicted class is updated in the database
        url = reverse('poultry_image_upload')
        data = {'image': self.test_image}
        response = self.client.post(url, data, format='multipart')

        self.assertEqual(response.status_code, 200)

        # Get the uploaded image from the database
        uploaded_image = PoultryImage.objects.first()
        self.assertIsNotNone(uploaded_image)
        
        # Check if the predicted_class field is updated
        self.assertIsNotNone(uploaded_image.predicted_class)
