import api from './api'
import { mockAlerts } from './mockData'

let localAlerts = [...mockAlerts]

export const getAlerts = async (params) => {
  try {
    const res = await api.get('/alerts', { params })
    return res.data
  } catch {
    let result = [...localAlerts]
    if (params?.status && params.status !== 'ALL') {
      result = result.filter(a => a.status === params.status)
    }
    if (params?.severity && params.severity !== 'ALL') {
      result = result.filter(a => a.severity === params.severity)
    }
    return result
  }
}

export const updateAlertStatus = async (id, status) => {
  try {
    const res = await api.put(`/alerts/${id}/status`, { status })
    return res.data
  } catch {
    localAlerts = localAlerts.map(a => a.id === Number(id) ? { ...a, status } : a)
    return localAlerts.find(a => a.id === Number(id))
  }
}
