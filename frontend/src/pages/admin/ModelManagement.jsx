import { useState } from 'react'
import {
  Box, Typography, Grid, Paper, Card, CardContent, Button, Chip, Divider, Switch, FormControlLabel
} from '@mui/material'
import {
  Memory, CheckCircle, Dashboard as DashIcon, People, Storage,
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

export default function AdminModelManagement() {
  const [activeModel, setActiveModel] = useState('WildLumina-YOLOv8x-v2.1')

  return (
    <DashboardLayout sidebarItems={adminNavItems} sidebarTitle="System Admin" pageTitle="AI Model Deployment & Versioning">
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} color="primary.dark">
          YOLO Detection Model Registry & Deployment
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage active model weights, inference speed, and deployed versions
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, borderLeft: '6px solid #2E7D32' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" fontWeight={700}>WildLumina-YOLOv8x-v2.1</Typography>
                <Chip label="ACTIVE DEPLOYED" color="success" size="small" sx={{ fontWeight: 700 }} />
              </Box>
              <Typography variant="body2" color="text.secondary" paragraph>
                Trained on 59,900 Western Ghats camera trap images. 95.4% mAP50 precision.
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="caption" color="text.secondary">mAP50</Typography>
                  <Typography variant="h6" fontWeight={700} color="primary.dark">95.4%</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="caption" color="text.secondary">Precision</Typography>
                  <Typography variant="h6" fontWeight={700} color="primary.dark">94.8%</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="caption" color="text.secondary">Inference Time</Typography>
                  <Typography variant="h6" fontWeight={700} color="secondary.dark">14ms</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" fontWeight={700}>WildLumina-YOLOv8l-v2.0</Typography>
                <Chip label="STANDBY ARCHIVE" color="default" size="small" />
              </Box>
              <Typography variant="body2" color="text.secondary" paragraph>
                Previous stable lightweight deployment. 92.1% mAP50 precision.
              </Typography>
              <Button size="small" variant="outlined" color="primary" onClick={() => setActiveModel('WildLumina-YOLOv8l-v2.0')}>
                Switch to this Model
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  )
}
