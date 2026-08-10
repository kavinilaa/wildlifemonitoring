import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from ultralytics import YOLO
from config.config import MODEL_PATH, CONFIDENCE_THRESHOLD
from utils.logger import configure_logger

logger = configure_logger(__name__)


def load_model(model_path=None):
    path = model_path or MODEL_PATH
    if not os.path.exists(path):
        raise FileNotFoundError(f'Model file not found: {path}')
    logger.info('Loading YOLO model from %s', path)
    return YOLO(path)


def run_inference(model, image_path):
    if not os.path.exists(image_path):
        raise FileNotFoundError(f'Image not found: {image_path}')

    logger.info('Running inference on image %s', image_path)
    results = model(image_path)
    detections = []

    for result in results:
        boxes = result.boxes
        for box in boxes:
            conf = float(box.conf)
            if conf < CONFIDENCE_THRESHOLD:
                continue
            cls_idx = int(box.cls.cpu().numpy()[0]) if box.cls is not None else None
            label = model.names.get(cls_idx, str(cls_idx)) if cls_idx is not None else 'unknown'
            x1, y1, x2, y2 = box.xyxy[0].cpu().numpy().tolist()
            detections.append({
                'animalName': label,
                'confidence': round(conf, 4),
                'boundingBox': {
                    'x1': int(x1),
                    'y1': int(y1),
                    'x2': int(x2),
                    'y2': int(y2),
                },
            })

    return detections
