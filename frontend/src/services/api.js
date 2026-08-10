import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 5000,
})

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('wl_user') || 'null')
  if (user?.token) config.headers.Authorization = `Bearer ${user.token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('wl_user')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default api

