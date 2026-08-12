import api from './api'

export const getAdminDashboard = async () => {
  const res = await api.get('/dashboard/admin')
  return res.data
}

export const getOfficerDashboard = async () => {
  const res = await api.get('/dashboard/officer')
  return res.data
}

export const getResearcherDashboard = async () => {
  const res = await api.get('/dashboard/researcher')
  return res.data
}

export const getModelStatus = async () => {
  const res = await api.get('/model/status')
  return res.data
}

export const getMonitoringStatus = async () => {
  const res = await api.get('/monitoring/status')
  return res.data
}
