from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import PoultryImage
from .utils import load_and_preprocess_test_image, predict_disease
from django.http import JsonResponse


class PoultryImageUpload(APIView):
    def post(self, request, format=None):
        image = request.data.get("image")

        # Save the uploaded image
        poultry_image = PoultryImage(image=image)
        poultry_image.save()

        classes = ["cocci", "healthy", "ncd", "salmo"]
        # Load and preprocess the test image
        test_image = load_and_preprocess_test_image(poultry_image.image.path)

        # Make prediction
        predicted_class_index, confidence = predict_disease(test_image)[:3]

        if confidence < 0.95:
            predicted_class = "Unknown"
        else:
            predicted_class_index = predicted_class_index
            predicted_class = classes[predicted_class_index]

        # Update the model with the predicted class
        poultry_image.predicted_class = predicted_class_index
        poultry_image.save()

        response_data = {
            "predicted_class": predicted_class,
            "confidence": float(confidence),
        }
        return JsonResponse(response_data, status=200)
