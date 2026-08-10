import { useState } from 'react'
import {
  Box, Typography, Paper, Card, CardContent, TextField, Button, Divider, Alert
} from '@mui/material'
import {
  Settings, Save, Dashboard as DashIcon, People, Storage, Memory,
  MonitorHeart, Timeline, Assessment
} from '@mui/icons-material'
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

export default function AdminSettings() {
  const [success, setSuccess] = useState(false)
  const [apiUrl, setApiUrl] = useState('http://localhost:8080/api')
  const [folderPath, setFolderPath] = useState('datasets/incoming_images/')

  const handleSave = (e) => {
    e.preventDefault()
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <DashboardLayout sidebarItems={adminNavItems} sidebarTitle="System Admin" pageTitle="Global System Settings">
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} color="primary.dark">
          System Administration & Environment Config
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Configure API endpoints, Python camera trap folder path, and polling refresh intervals
        </Typography>
      </Box>

      {success && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
          Global system settings updated successfully!
        </Alert>
      )}

      <Card sx={{ borderRadius: 3, maxWidth: 650 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={700} color="primary.dark" gutterBottom>
            Core Environment Variables
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Box component="form" onSubmit={handleSave} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField
              fullWidth
              label="Spring Boot API Base URL (VITE_API_BASE_URL)"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              helperText="Default: http://localhost:8080/api"
            />

            <TextField
              fullWidth
              label="Monitored Image Incoming Folder Path"
              value={folderPath}
              onChange={(e) => setFolderPath(e.target.value)}
              helperText="Python folder monitor watches: datasets/incoming_images/"
            />

            <Button type="submit" variant="contained" color="primary" startIcon={<Save />} sx={{ py: 1.2, fontWeight: 700 }}>
              Save Environment Configuration
            </Button>
          </Box>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
