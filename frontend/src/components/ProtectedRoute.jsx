import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const roleHome = {
  SYSTEM_ADMIN:   '/admin/dashboard',
  FOREST_OFFICER: '/officer/dashboard',
  RESEARCHER:     '/researcher/dashboard',
}

export default function ProtectedRoute({ children, allowedRole }) {
  const { user } = useAuth()

  if (!user) return <Navigate to="/login" replace />

  if (allowedRole) {
    const isAllowed = Array.isArray(allowedRole) 
      ? allowedRole.includes(user.role) 
      : user.role === allowedRole

    if (!isAllowed) {
      return <Navigate to={roleHome[user.role] || '/login'} replace />
    }
  }

  return children
}
