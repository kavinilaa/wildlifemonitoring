import api from './api'

export const getModelMetrics = async () => {
  const res = await api.get('/model/metrics')
  return res.data
}

export const runPredictionTest = async (formData) => {
  const res = await api.post('/model/predict', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return res.data
}
