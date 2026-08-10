import os

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))

MODEL_PATH = os.getenv('MODEL_PATH', os.path.join(BASE_DIR, 'trained-models', 'best.pt'))
INCOMING_FOLDER = os.getenv('INCOMING_FOLDER', os.path.join(BASE_DIR, 'datasets', 'incoming_images'))
PROCESSED_FOLDER = os.getenv('PROCESSED_FOLDER', os.path.join(BASE_DIR, 'datasets', 'processed_images'))
PREDICTION_FOLDER = os.getenv('PREDICTION_FOLDER', os.path.join(BASE_DIR, 'datasets', 'prediction_results'))
BACKEND_URL = os.getenv('BACKEND_URL', 'http://localhost:8080/api/detections')
CONFIDENCE_THRESHOLD = float(os.getenv('CONFIDENCE_THRESHOLD', '0.5'))
SUPPORTED_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.webp'}

TRAINING_DATASET_DIR = os.getenv('TRAINING_DATASET_DIR', os.path.join(BASE_DIR, 'datasets', 'training_dataset'))
