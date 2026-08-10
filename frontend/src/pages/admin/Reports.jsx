import { useState } from 'react'
import {
  Box, Typography, Paper, Grid, Card, CardContent, Button, Divider, Alert
} from '@mui/material'
import {
  Assessment, Download, PictureAsPdf, Dashboard as DashIcon,
  People, Storage, Memory, MonitorHeart, Timeline, Settings
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

export default function AdminReports() {
  const [success, setSuccess] = useState(false)

  const handleExport = () => {
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <DashboardLayout sidebarItems={adminNavItems} sidebarTitle="System Admin" pageTitle="System Audit & Administration Reports">
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} color="primary.dark">
          System Audit & Security Logs Export
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Export administrative logs, user access metrics, and system audit history
        </Typography>
      </Box>

      {success && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
          Master System Audit Report exported successfully!
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={700} color="primary.dark" gutterBottom>
                Export Master System Audit
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Typography variant="body2" paragraph color="text.secondary">
                Includes complete user session history, model deployment audit, database transactions, and folder monitoring events.
              </Typography>
              <Button variant="contained" color="primary" startIcon={<PictureAsPdf />} onClick={handleExport} sx={{ fontWeight: 700 }}>
                Export Full Audit Log (PDF)
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  )
}
