import api from './api'

export const getAlerts = async (params) => {
  const res = await api.get('/alerts', { params })
  return res.data
}

export const updateAlertStatus = async (id, status) => {
  const res = await api.put(`/alerts/${id}/status`, { status })
  return res.data
}
