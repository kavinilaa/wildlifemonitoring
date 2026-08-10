import api from './api'
import { mockUsers } from './mockData'

export const login = async (credentials) => {
  try {
    const res = await api.post('/auth/login', credentials)
    return res.data
  } catch {
    // Mock fallback: match loginId + role
    const user = mockUsers.find(
      u => u.loginId === credentials.loginId && u.role === credentials.role
    )
    if (user) return { ...user, token: null }
    throw new Error('Invalid Login ID or Password for the selected role.')
  }
}

export const register = async (data) => {
  try {
    const res = await api.post('/auth/register', data)
    return res.data
  } catch {
    // Mock fallback: simulate backend-assigned loginId
    const prefixes = { FOREST_OFFICER: 'FO', RESEARCHER: 'RES', SYSTEM_ADMIN: 'ADMIN' }
    const prefix = prefixes[data.role] || 'USR'
    const num = Math.floor(1000 + Math.random() * 9000)
    return { ...data, loginId: `${prefix}${num}`, id: num }
  }
}

export const getUsers = () => api.get('/users').then(r => r.data)
export const getUserById = (id) => api.get(`/users/${id}`).then(r => r.data)
