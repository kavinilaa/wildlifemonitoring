import api from './api'

export const getMonitoringStatus = async () => {
  const res = await api.get('/monitoring/status')
  return res.data
}

export const toggleFolderMonitoring = async (active) => {
  const res = await api.post('/monitoring/toggle', { active })
  return res.data
}
