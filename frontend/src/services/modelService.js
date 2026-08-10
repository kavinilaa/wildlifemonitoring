import api from './api'
import { mockResearcherStats } from './mockData'

export const getModelMetrics = async () => {
  try {
    const res = await api.get('/model/metrics')
    return res.data
  } catch {
    return mockResearcherStats
  }
}

export const runPredictionTest = async (formData) => {
  try {
    const res = await api.post('/model/predict', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return res.data
  } catch {
    // Return sample simulated detection prediction
    return {
      animalName: 'Bengal Tiger',
      confidence: 0.958,
      bbox: { x: 120, y: 80, width: 340, height: 260 },
      imageUrl: '/assets/images/tiger_detection.png',
      processingTimeMs: 142,
      modelUsed: 'WildLumina-YOLOv8x-v2.1',
    }
  }
}
