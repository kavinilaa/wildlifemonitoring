import api from './api'

export const login = async (credentials) => {
  const res = await api.post('/auth/login', credentials)
  return res.data
}

export const register = async (data) => {
  const res = await api.post('/auth/register', data)
  return res.data
}

export const getUsers = () => api.get('/users').then(r => r.data)
export const getUserById = (id) => api.get(`/users/${id}`).then(r => r.data)
