import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import ProtectedRoute from '../components/ProtectedRoute'

// Auth Pages
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard'
import UserManagement from '../pages/admin/UserManagement'
import AdminDatasetManagement from '../pages/admin/DatasetManagement'
import AdminModelManagement from '../pages/admin/ModelManagement'
import AdminSystemMonitoring from '../pages/admin/SystemMonitoring'
import AdminAnalytics from '../pages/admin/Analytics'
import AdminReports from '../pages/admin/Reports'
import AdminSettings from '../pages/admin/Settings'

// Officer Pages
import OfficerDashboard from '../pages/officer/OfficerDashboard'
import AIMonitoring from '../pages/officer/AIMonitoring'
import DetectionHistory from '../pages/officer/DetectionHistory'
import Alerts from '../pages/officer/Alerts'
import OfficerReports from '../pages/officer/Reports'
import OfficerSettings from '../pages/officer/Settings'

// Researcher Pages
import ResearcherDashboard from '../pages/researcher/ResearcherDashboard'
import ResearcherDatasetManagement from '../pages/researcher/DatasetManagement'
import ResearcherModelTraining from '../pages/researcher/ModelTraining'
import ResearcherModelEvaluation from '../pages/researcher/ModelEvaluation'
import ResearcherPredictionTesting from '../pages/researcher/PredictionTesting'
import ResearcherAnalytics from '../pages/researcher/ResearchAnalytics'
import ResearcherReports from '../pages/researcher/Reports'
import ResearcherSettings from '../pages/researcher/Settings'

export default function AppRoutes() {
  const { user } = useAuth()

  const getRoleHome = () => {
    if (!user) return '/login'
    if (user.role === 'SYSTEM_ADMIN') return '/admin/dashboard'
    if (user.role === 'RESEARCHER') return '/researcher/dashboard'
    return '/officer/dashboard'
  }

  return (
    <Routes>
      {/* Root & Auth Routes */}
      <Route path="/" element={<Navigate to={getRoleHome()} replace />} />
      <Route path="/login" element={user ? <Navigate to={getRoleHome()} replace /> : <Login />} />
      <Route path="/register" element={<Register />} />

      {/* SYSTEM_ADMIN Routes */}
      <Route path="/admin/dashboard" element={<ProtectedRoute allowedRole="SYSTEM_ADMIN"><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute allowedRole="SYSTEM_ADMIN"><UserManagement /></ProtectedRoute>} />
      <Route path="/admin/datasets" element={<ProtectedRoute allowedRole="SYSTEM_ADMIN"><AdminDatasetManagement /></ProtectedRoute>} />
      <Route path="/admin/models" element={<ProtectedRoute allowedRole="SYSTEM_ADMIN"><AdminModelManagement /></ProtectedRoute>} />
      <Route path="/admin/monitoring" element={<ProtectedRoute allowedRole="SYSTEM_ADMIN"><AdminSystemMonitoring /></ProtectedRoute>} />
      <Route path="/admin/analytics" element={<ProtectedRoute allowedRole="SYSTEM_ADMIN"><AdminAnalytics /></ProtectedRoute>} />
      <Route path="/admin/reports" element={<ProtectedRoute allowedRole="SYSTEM_ADMIN"><AdminReports /></ProtectedRoute>} />
      <Route path="/admin/settings" element={<ProtectedRoute allowedRole="SYSTEM_ADMIN"><AdminSettings /></ProtectedRoute>} />

      {/* FOREST_OFFICER Routes */}
      <Route path="/officer/dashboard" element={<ProtectedRoute allowedRole="FOREST_OFFICER"><OfficerDashboard /></ProtectedRoute>} />
      <Route path="/officer/monitoring" element={<ProtectedRoute allowedRole="FOREST_OFFICER"><AIMonitoring /></ProtectedRoute>} />
      <Route path="/officer/history" element={<ProtectedRoute allowedRole="FOREST_OFFICER"><DetectionHistory /></ProtectedRoute>} />
      <Route path="/officer/alerts" element={<ProtectedRoute allowedRole="FOREST_OFFICER"><Alerts /></ProtectedRoute>} />
      <Route path="/officer/reports" element={<ProtectedRoute allowedRole="FOREST_OFFICER"><OfficerReports /></ProtectedRoute>} />
      <Route path="/officer/settings" element={<ProtectedRoute allowedRole="FOREST_OFFICER"><OfficerSettings /></ProtectedRoute>} />

      {/* RESEARCHER Routes */}
      <Route path="/researcher/dashboard" element={<ProtectedRoute allowedRole="RESEARCHER"><ResearcherDashboard /></ProtectedRoute>} />
      <Route path="/researcher/datasets" element={<ProtectedRoute allowedRole="RESEARCHER"><ResearcherDatasetManagement /></ProtectedRoute>} />
      <Route path="/researcher/training" element={<ProtectedRoute allowedRole="RESEARCHER"><ResearcherModelTraining /></ProtectedRoute>} />
      <Route path="/researcher/evaluation" element={<ProtectedRoute allowedRole="RESEARCHER"><ResearcherModelEvaluation /></ProtectedRoute>} />
      <Route path="/researcher/testing" element={<ProtectedRoute allowedRole="RESEARCHER"><ResearcherPredictionTesting /></ProtectedRoute>} />
      <Route path="/researcher/analytics" element={<ProtectedRoute allowedRole="RESEARCHER"><ResearcherAnalytics /></ProtectedRoute>} />
      <Route path="/researcher/reports" element={<ProtectedRoute allowedRole="RESEARCHER"><ResearcherReports /></ProtectedRoute>} />
      <Route path="/researcher/settings" element={<ProtectedRoute allowedRole="RESEARCHER"><ResearcherSettings /></ProtectedRoute>} />

      {/* Fallback Catch-All */}
      <Route path="*" element={<Navigate to={getRoleHome()} replace />} />
    </Routes>
  )
}
