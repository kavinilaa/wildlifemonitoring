import api from './api'
import { mockAdminStats, mockMonitoringStatus, mockResearcherStats, mockDetections, mockAlerts } from './mockData'

export const getAdminDashboard = async () => {
  try {
    const res = await api.get('/dashboard/admin')
    return res.data
  } catch {
    return mockAdminStats
  }
}

export const getOfficerDashboard = async () => {
  try {
    const res = await api.get('/dashboard/officer')
    return res.data
  } catch {
    return {
      imagesProcessedToday: mockMonitoringStatus.imagesProcessedToday,
      detectionsToday: mockMonitoringStatus.detectionsToday,
      activeAlerts: mockAlerts.filter(a => a.status === 'ACTIVE').length,
      rareSpeciesDetections: 4,
      monitoringStatus: mockMonitoringStatus.folderMonitoring,
      latestDetection: mockDetections[0],
      recentDetections: mockDetections,
    }
  }
}

export const getResearcherDashboard = async () => {
  try {
    const res = await api.get('/dashboard/researcher')
    return res.data
  } catch {
    return mockResearcherStats
  }
}

export const getModelStatus = async () => {
  try {
    const res = await api.get('/model/status')
    return res.data
  } catch {
    return {
      status: 'LOADED',
      modelName: 'WildLumina-YOLOv8x-v2.1',
      version: '2.1.0',
      accuracy: '95.4%',
      lastLoaded: '2026-08-10 06:00:00',
    }
  }
}

export const getMonitoringStatus = async () => {
  try {
    const res = await api.get('/monitoring/status')
    return res.data
  } catch {
    return mockMonitoringStatus
  }
}
