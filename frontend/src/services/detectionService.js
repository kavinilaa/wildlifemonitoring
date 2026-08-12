import api from './api'

export const getDetections = async (params) => {
  const res = await api.get('/detections', { params })
  return res.data
}

export const getDetectionById = async (id) => {
  const res = await api.get(`/detections/${id}`)
  return res.data
}

export const getLatestDetection = async () => {
  const res = await api.get('/detections/latest')
  return res.data
}
