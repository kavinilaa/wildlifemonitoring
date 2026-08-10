import { useState } from 'react'
import {
  Box, Typography, Grid, Paper, Card, CardContent, Button, Divider, LinearProgress, Chip
} from '@mui/material'
import {
  Storage, UploadFile, Dashboard as DashIcon, People, Memory,
  MonitorHeart, Timeline, Assessment, Settings
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

export default function AdminDatasetManagement() {
  return (
    <DashboardLayout sidebarItems={adminNavItems} sidebarTitle="System Admin" pageTitle="Camera Trap Dataset Storage Management">
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} color="primary.dark">
          Dataset Storage & Repository Management
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Monitor image archive storage, class distributions, and training splits
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="caption" color="text.secondary" textTransform="uppercase" fontWeight={600}>Total Images Archived</Typography>
              <Typography variant="h4" fontWeight={800} color="primary.dark" mt={0.5}>59,900</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="caption" color="text.secondary" textTransform="uppercase" fontWeight={600}>Storage Used</Typography>
              <Typography variant="h4" fontWeight={800} color="secondary.dark" mt={0.5}>428.5 GB</Typography>
              <LinearProgress variant="determinate" value={68} sx={{ mt: 1, borderRadius: 1 }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="caption" color="text.secondary" textTransform="uppercase" fontWeight={600}>Species Classes</Typography>
              <Typography variant="h4" fontWeight={800} color="primary.main" mt={0.5}>12 Classes</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="caption" color="text.secondary" textTransform="uppercase" fontWeight={600}>Incoming Folder</Typography>
              <Typography variant="subtitle1" fontWeight={700} color="success.main" mt={0.5}>datasets/incoming_images/</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" fontWeight={700} color="primary.dark" gutterBottom>
          Dataset Directory Structure
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 2 }}>
              <Typography variant="subtitle2" fontWeight={700}>train/ (45,200 images)</Typography>
              <Typography variant="caption" color="text.secondary">80% Training Split</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 2 }}>
              <Typography variant="subtitle2" fontWeight={700}>val/ (8,500 images)</Typography>
              <Typography variant="caption" color="text.secondary">15% Validation Split</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 2 }}>
              <Typography variant="subtitle2" fontWeight={700}>test/ (6,200 images)</Typography>
              <Typography variant="caption" color="text.secondary">5% Testing Evaluation</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </DashboardLayout>
  )
}
