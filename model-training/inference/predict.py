import os
import sys
import argparse
from pathlib import Path

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from inference.detector import load_model, run_inference
from utils.logger import configure_logger

logger = configure_logger(__name__)


def main(args):
    model = load_model(args.model)
    detections = run_inference(model, args.image)

    response = {
        'imageName': Path(args.image).name,
        'detections': detections,
    }

    print(response)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Run WildLumina inference on an image')
    parser.add_argument('--image', required=True, help='Path to the image file')
    parser.add_argument('--model', help='Optional model path')
    args = parser.parse_args()
    main(args)
