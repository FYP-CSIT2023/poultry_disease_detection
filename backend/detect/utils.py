import numpy as np
from keras.models import load_model
from PIL import Image
import os
import requests
from io import BytesIO

model_path = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    "Model_deploy",
    "poultry_disease_model.h5",
)
model = load_model(model_path)

def load_and_preprocess_test_image(image_path):
    if image_path.startswith("http"):
        # Load image from URL
        response = requests.get(image_path)
        img = Image.open(BytesIO(response.content)).resize((128, 128))
    else:
        # Load local image
        img = Image.open(image_path).resize((128, 128))

    if img.mode != "RGB":
        img = img.convert("RGB")

    img_array = np.array(img) / 255.0
    return img_array


def predict_disease(test_image):
    # Reshape the image to match the model's expected input shape
    test_image = np.expand_dims(test_image, axis=0)

    # Make prediction
    predictions = model.predict(test_image)

    # Get the predicted class index
    predicted_class_index = np.argmax(predictions)

    confidence = np.max(predictions)
    print(confidence)

    return [predicted_class_index, confidence]
