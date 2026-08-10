import os
import sys
import argparse

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import yaml
from ultralytics import YOLO
from config.config import TRAINING_DATASET_DIR, MODEL_PATH
from utils.logger import configure_logger

logger = configure_logger(__name__)


def load_dataset_yaml(dataset_yaml_path):
    with open(dataset_yaml_path, 'r') as f:
        return yaml.safe_load(f)


def main(args):
    dataset_yaml = os.path.join(TRAINING_DATASET_DIR, 'dataset.yaml')
    logger.info('Loading dataset configuration from %s', dataset_yaml)
    data = load_dataset_yaml(dataset_yaml)

    model_file = args.model or MODEL_PATH
    if not os.path.exists(model_file):
        logger.error('Model not found at %s', model_file)
        return

    logger.info('Loading model from %s', model_file)
    model = YOLO(model_file)

    logger.info('Starting evaluation on val dataset')
    results = model.val(data=dataset_yaml, imgsz=args.imgsz, batch=args.batch)

    output_path = args.output or os.path.join(os.path.dirname(__file__), '..', 'results', 'evaluation.yaml')
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    metrics = {
        'precision': results.box.map[0].item() if results.box.map is not None else None,
        'recall': results.box.map[1].item() if results.box.map is not None else None,
        'map50': results.box.map[2].item() if results.box.map is not None else None,
        'map50_95': results.box.map[3].item() if results.box.map is not None else None,
    }

    with open(output_path, 'w') as f:
        yaml.safe_dump(metrics, f)

    logger.info('Evaluation results saved to %s', output_path)
    logger.info('Precision: %s, Recall: %s, mAP50: %s, mAP50-95: %s',
                metrics['precision'], metrics['recall'], metrics['map50'], metrics['map50_95'])


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Evaluate WildLumina YOLO model')
    parser.add_argument('--model', help='Model path to evaluate')
    parser.add_argument('--imgsz', type=int, default=640, help='Image size for evaluation')
    parser.add_argument('--batch', type=int, default=16, help='Batch size for evaluation')
    parser.add_argument('--output', help='Output file path for evaluation metrics')
    args = parser.parse_args()
    main(args)
