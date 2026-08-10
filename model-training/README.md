# WildLumina Model Training

This module implements the AI model training, inference, and automatic folder monitoring for WildLumina.

## Structure

- `training/` — training and evaluation scripts
- `inference/` — inference helper and prediction CLI
- `monitoring/` — real-time folder monitoring for new wildlife images
- `preprocessing/` — preprocessing utilities
- `config/` — configuration settings
- `utils/` — logging utilities
- `trained-models/` — saved YOLO models

## Setup

1. Create a Python environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Training

```bash
python training/train.py
```

## Evaluation

```bash
python training/evaluate.py
```

## Inference

```bash
python inference/predict.py --image path/to/image.jpg
```

## Monitoring

```bash
python monitoring/folder_monitor.py
```

## Dataset Layout

- `datasets/incoming_images/` — live detection input
- `datasets/processed_images/` — annotated output images
- `datasets/prediction_results/` — JSON prediction results
- `datasets/training_dataset/`
  - `images/train/`, `images/val/`, `images/test/`
  - `labels/train/`, `labels/val/`, `labels/test/`
  - `dataset.yaml`
