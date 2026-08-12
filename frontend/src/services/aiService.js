import api from './api'

const MOCK_PREDICTION_HISTORY = [
  { id: 1, imageName: 'elephant01.jpg', species: 'Elephant', confidence: 97.8, time: '10:35 AM', status: 'Detected' },
  { id: 2, imageName: 'deer02.jpg', species: 'Deer', confidence: 94.2, time: '10:20 AM', status: 'Detected' },
  { id: 3, imageName: 'tiger03.jpg', species: 'Tiger', confidence: 98.1, time: '09:55 AM', status: 'Detected' },
]

const mockPrediction = (fileName = 'wildlife-image.jpg') => ({
  species: 'Elephant',
  confidence: 97.8,
  status: 'Detected',
  processingTime: 1.24,
  model: 'YOLOv8',
  imageUrl: '',
  detectionImageUrl: '',
  imageName: fileName,
  detectedAt: new Date().toISOString(),
  bbox: { x: 58, y: 42, width: 280, height: 220 },
})

export const getMockPredictionHistory = () => MOCK_PREDICTION_HISTORY

export const predictImage = async (file) => {
  const formData = new FormData()
  formData.append('image', file)

  try {
    const response = await api.post('/model/predict', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  } catch (error) {
    return mockPrediction(file?.name || 'wildlife-image.jpg')
  }
}

export const savePrediction = async (file) => {
  const formData = new FormData()
  formData.append('image', file)

  const response = await api.post('/ai/predict', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 30000,
  })
  return response.data
}
