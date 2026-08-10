import api from './api'
import { mockDetections } from './mockData'

export const getDetections = async (params) => {
  try {
    const res = await api.get('/detections', { params })
    return res.data
  } catch {
    let result = [...mockDetections]
    if (params?.animal && params.animal !== 'ALL') {
      result = result.filter(d => d.animalName.toLowerCase().includes(params.animal.toLowerCase()))
    }
    if (params?.status && params.status !== 'ALL') {
      result = result.filter(d => d.status === params.status)
    }
    if (params?.minConfidence) {
      result = result.filter(d => d.confidence >= Number(params.minConfidence))
    }
    return result
  }
}

export const getDetectionById = async (id) => {
  try {
    const res = await api.get(`/detections/${id}`)
    return res.data
  } catch {
    return mockDetections.find(d => d.id === Number(id)) || mockDetections[0]
  }
}

export const getLatestDetection = async () => {
  try {
    const res = await api.get('/detections/latest')
    return res.data
  } catch {
    return mockDetections[0]
  }
}
