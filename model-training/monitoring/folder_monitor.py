import os
import sys
import time
import json
from pathlib import Path
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from requests import post, RequestException
from datetime import datetime

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from config.config import (
    INCOMING_FOLDER,
    PROCESSED_FOLDER,
    PREDICTION_FOLDER,
    BACKEND_URL,
    SUPPORTED_EXTENSIONS,
)
from preprocessing.preprocess import validate_image, preprocess_image
from inference.detector import load_model, run_inference
from utils.logger import configure_logger
import cv2

logger = configure_logger(__name__)


def ensure_directories():
    os.makedirs(INCOMING_FOLDER, exist_ok=True)
    os.makedirs(PROCESSED_FOLDER, exist_ok=True)
    os.makedirs(PREDICTION_FOLDER, exist_ok=True)


def wait_for_file_complete(path, timeout=10, interval=0.5):
    logger.info('Waiting for file to complete: %s', path)
    end_time = time.time() + timeout
    last_size = -1
    while time.time() < end_time:
        try:
            size = os.path.getsize(path)
            if size == last_size and size > 0:
                return True
            last_size = size
        except OSError:
            pass
        time.sleep(interval)
    return False


def render_predictions(image, detections):
    annotated = image.copy()
    for det in detections:
        box = det['boundingBox']
        label = f"{det['animalName']} {det['confidence'] * 100:.1f}%"
        cv2.rectangle(annotated, (box['x1'], box['y1']), (box['x2'], box['y2']), (34, 139, 34), 2)
        cv2.putText(annotated, label, (box['x1'], max(box['y1'] - 10, 0)), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)
    return annotated


def save_prediction_json(image_name, detections, processed_image_name):
    payload = {
        'imageName': image_name,
        'detections': detections,
        'detectionTime': datetime.utcnow().isoformat(),
        'imagePath': processed_image_name,
    }
    output_path = os.path.join(PREDICTION_FOLDER, f'{Path(image_name).stem}.json')
    with open(output_path, 'w') as f:
        json.dump(payload, f, indent=2)
    logger.info('Prediction JSON saved: %s', output_path)
    return payload


def send_prediction(payload):
    try:
        logger.info('Sending prediction to backend: %s', BACKEND_URL)
        response = post(BACKEND_URL, json=payload, timeout=10)
        response.raise_for_status()
        logger.info('Prediction successfully sent to backend')
    except RequestException as exc:
        logger.error('Backend unavailable: %s', exc)


class WildLuminaHandler(FileSystemEventHandler):
    def __init__(self, model):
        super().__init__()
        self.model = model

    def on_created(self, event):
        if event.is_directory:
            return

        filepath = event.src_path
        _, ext = os.path.splitext(filepath)
        if ext.lower() not in SUPPORTED_EXTENSIONS:
            logger.error('Unsupported file format detected: %s', filepath)
            return

        if not wait_for_file_complete(filepath):
            logger.error('File did not finish writing in time: %s', filepath)
            return

        try:
            logger.info('New image detected: %s', filepath)
            image = validate_image(filepath)
            preprocessed = preprocess_image(image)

            detections = run_inference(self.model, filepath)
            if not detections:
                logger.info('No detections found in image: %s', filepath)

            annotated = render_predictions(preprocessed, detections)
            processed_filename = f'{Path(filepath).stem}_processed{ext}'
            processed_path = os.path.join(PROCESSED_FOLDER, processed_filename)
            cv2.imwrite(processed_path, annotated)
            logger.info('Processed image saved: %s', processed_path)

            payload = save_prediction_json(Path(filepath).name, detections, os.path.relpath(processed_path, os.path.join(os.path.dirname(__file__), '..', '..')))
            send_prediction(payload)
        except Exception as exc:
            logger.error('Processing failed for %s: %s', filepath, exc)


def main():
    print('========================================')
    print('WildLumina AI Monitoring System')
    print('========================================')

    ensure_directories()
    model = load_model()
    print('Model: LOADED')
    print('Folder Monitoring: ACTIVE')
    print(f'Incoming Folder: {INCOMING_FOLDER}')
    print(f'Processed Folder: {PROCESSED_FOLDER}')
    print(f'Backend: {BACKEND_URL}')
    print('Waiting for new wildlife images...')

    observer = Observer()
    event_handler = WildLuminaHandler(model)
    observer.schedule(event_handler, INCOMING_FOLDER, recursive=False)
    observer.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()


if __name__ == '__main__':
    main()
