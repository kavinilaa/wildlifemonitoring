import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import cv2
from utils.logger import configure_logger

logger = configure_logger(__name__)


def validate_image(path):
    if not os.path.exists(path):
        raise FileNotFoundError(f'Image does not exist: {path}')
    try:
        image = cv2.imread(path)
        if image is None:
            raise ValueError('Unable to read image or unsupported format')
        return image
    except Exception as exc:
        logger.error('Invalid image %s: %s', path, exc)
        raise


def preprocess_image(image):
    logger.info('Preprocessing image')
    return image
