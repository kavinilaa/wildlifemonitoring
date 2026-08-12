import api from './api'

export const getDatasetOverview = async () => {
  const res = await api.get('/datasets/overview')
  return res.data
}
