# WildLumina

WildLumina is an AI-based wildlife monitoring system split into three independent modules:

- `frontend/` — React UI and user dashboards
- `backend/` — Spring Boot REST API and MySQL integration
- `model-training/` — Python AI model training, inference, and folder monitoring

## Project structure

```
WildLumina/
├── frontend/
├── backend/
├── model-training/
├── datasets/
│   ├── incoming_images/
│   ├── processed_images/
│   └── training_dataset/
└── trained-models/
```

## Next steps

1. Implement backend module in `backend/`
2. Implement Python AI model training and monitoring in `model-training/`
3. Connect frontend to backend and complete the end-to-end workflow
