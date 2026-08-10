import os
import sys
import argparse

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from ultralytics import YOLO
import yaml
from datetime import datetime
from config.config import TRAINING_DATASET_DIR, MODEL_PATH
from utils.logger import configure_logger

logger = configure_logger(__name__)


def load_dataset_yaml(dataset_yaml_path):
    with open(dataset_yaml_path, 'r') as f:
        return yaml.safe_load(f)


def ensure_directory(path):
    os.makedirs(os.path.dirname(path), exist_ok=True)


def main(args):
    dataset_yaml = os.path.join(TRAINING_DATASET_DIR, 'dataset.yaml')
    logger.info('Loading dataset configuration from %s', dataset_yaml)
    data = load_dataset_yaml(dataset_yaml)

    model_name = args.model or 'yolov8n'
    epochs = args.epochs
    batch = args.batch
    imgsz = args.imgsz
    project = args.project
    name = args.name

    logger.info('Initializing YOLO model: %s', model_name)
    model = YOLO(model_name)

    logger.info('Starting training for %s epochs', epochs)
    result = model.train(
        data=dataset_yaml,
        epochs=epochs,
        batch=batch,
        imgsz=imgsz,
        project=project,
        name=name,
        exist_ok=True,
        save=True,
    )

    best_path = os.path.join(project, name, 'weights', 'best.pt')
    if os.path.exists(best_path):
        ensure_directory(MODEL_PATH)
        logger.info('Saving best model to %s', MODEL_PATH)
        os.replace(best_path, MODEL_PATH)
    else:
        logger.error('Best model not found at %s', best_path)

    metrics_path = os.path.join(project, name, 'metrics.yaml')
    if os.path.exists(metrics_path):
        logger.info('Training metrics saved to %s', metrics_path)
    else:
        logger.warning('Training metrics not found after training')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Train WildLumina YOLO model')
    parser.add_argument('--model', default='yolov8n', help='YOLO base model name')
    parser.add_argument('--epochs', type=int, default=20, help='Number of training epochs')
    parser.add_argument('--batch', type=int, default=16, help='Batch size')
    parser.add_argument('--imgsz', type=int, default=640, help='Image size')
    parser.add_argument('--project', default=os.path.join(os.path.dirname(__file__), '..', 'runs', 'train'), help='Project output directory')
    parser.add_argument('--name', default='wildlumina', help='Training run name')
    args = parser.parse_args()
    main(args)
