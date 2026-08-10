import api from './api'
import { mockMonitoringStatus } from './mockData'

export const getMonitoringStatus = async () => {
  try {
    const res = await api.get('/monitoring/status')
    return res.data
  } catch {
    return mockMonitoringStatus
  }
}

export const toggleFolderMonitoring = async (active) => {
  try {
    const res = await api.post('/monitoring/toggle', { active })
    return res.data
  } catch {
    return { ...mockMonitoringStatus, folderMonitoring: active ? 'ACTIVE' : 'INACTIVE' }
  }
}
