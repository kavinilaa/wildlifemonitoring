import { Box, Typography, Paper, Grid } from '@mui/material'
import {
  Timeline, Dashboard as DashIcon, People, Storage, Memory,
  MonitorHeart, Assessment, Settings
} from '@mui/icons-material'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts'
import DashboardLayout from '../../layouts/DashboardLayout'

const adminNavItems = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: <DashIcon fontSize="small" /> },
  { label: 'User Management', path: '/admin/users', icon: <People fontSize="small" /> },
  { label: 'Dataset Management', path: '/admin/datasets', icon: <Storage fontSize="small" /> },
  { label: 'AI Model Management', path: '/admin/models', icon: <Memory fontSize="small" /> },
  { label: 'System Monitoring', path: '/admin/monitoring', icon: <MonitorHeart fontSize="small" /> },
  { label: 'Analytics', path: '/admin/analytics', icon: <Timeline fontSize="small" /> },
  { label: 'Reports', path: '/admin/reports', icon: <Assessment fontSize="small" /> },
  { label: 'Settings', path: '/admin/settings', icon: <Settings fontSize="small" /> },
]

const monthlyData = [
  { month: 'Jan', Tigers: 62, Elephants: 210, Leopards: 48, Gaurs: 180 },
  { month: 'Feb', Tigers: 74, Elephants: 235, Leopards: 55, Gaurs: 195 },
  { month: 'Mar', Tigers: 89, Elephants: 284, Leopards: 74, Gaurs: 211 },
  { month: 'Apr', Tigers: 95, Elephants: 310, Leopards: 68, Gaurs: 240 },
  { month: 'May', Tigers: 82, Elephants: 290, Leopards: 60, Gaurs: 220 },
  { month: 'Jun', Tigers: 91, Elephants: 325, Leopards: 79, Gaurs: 255 },
]

export default function AdminAnalytics() {
  return (
    <DashboardLayout sidebarItems={adminNavItems} sidebarTitle="System Admin" pageTitle="Advanced System & Species Analytics">
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} color="primary.dark">
          WildLumina Ecological & System Analytics
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Multi-species monthly trends, seasonal migration metrics, and system throughput
        </Typography>
      </Box>

      <Paper sx={{ p: 3, borderRadius: 3, height: 420 }}>
        <Typography variant="h6" fontWeight={700} color="primary.dark" mb={2}>
          Monthly Species Detection Comparison
        </Typography>
        <ResponsiveContainer width="100%" height={340}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Tigers" fill="#F57C00" name="Bengal Tigers" />
            <Bar dataKey="Elephants" fill="#4CAF50" name="Asian Elephants" />
            <Bar dataKey="Leopards" fill="#D32F2F" name="Indian Leopards" />
            <Bar dataKey="Gaurs" fill="#7B68EE" name="Indian Gaurs" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </DashboardLayout>
  )
}
