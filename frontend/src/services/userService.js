import api from './api'

export const getUsers = async () => {
  const res = await api.get('/users')
  return res.data
}

export const getUserById = async (id) => {
  const res = await api.get(`/users/${id}`)
  return res.data
}

export const createUser = async (userData) => {
  const res = await api.post('/users', userData)
  return res.data
}

export const updateUserStatus = async (id, status) => {
  const res = await api.put(`/users/${id}/status`, { status })
  return res.data
}
