import api from './api'
import { mockResearcherStats, mockAdminStats } from './mockData'

export const getDatasetOverview = async () => {
  try {
    const res = await api.get('/datasets/overview')
    return res.data
  } catch {
    return {
      trainingImages: mockResearcherStats.trainingImages,
      validationImages: mockResearcherStats.validationImages,
      testingImages: mockResearcherStats.testingImages,
      totalClasses: mockResearcherStats.numberOfClasses,
      speciesDistribution: mockAdminStats.speciesDistribution,
    }
  }
}
