import {
  Box, Typography, Grid, Paper, Card, CardContent, Chip, Divider, List, ListItem, ListItemText
} from '@mui/material'
import {
  MonitorHeart, CheckCircle, Storage, Memory, Dashboard as DashIcon,
  People, Timeline, Assessment, Settings
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

export default function AdminSystemMonitoring() {
  return (
    <DashboardLayout sidebarItems={adminNavItems} sidebarTitle="System Admin" pageTitle="System Health & Infrastructure Telemetry">
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} color="primary.dark">
          Infrastructure Services & Microservice Health
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Live connection telemetry across Python Monitor, Spring Boot REST API, MySQL Database, and React Frontend
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="subtitle2" fontWeight={700}>Spring Boot Backend API</Typography>
              <Typography variant="caption" color="text.secondary">Port 8080</Typography>
              <Box sx={{ mt: 1 }}>
                <Chip label="ONLINE (UP)" color="success" size="small" sx={{ fontWeight: 700 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="subtitle2" fontWeight={700}>MySQL Database Engine</Typography>
              <Typography variant="caption" color="text.secondary">Port 3306</Typography>
              <Box sx={{ mt: 1 }}>
                <Chip label="HEALTHY" color="success" size="small" sx={{ fontWeight: 700 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="subtitle2" fontWeight={700}>Python Folder Monitor</Typography>
              <Typography variant="caption" color="text.secondary">Watchdog Process</Typography>
              <Box sx={{ mt: 1 }}>
                <Chip label="ACTIVE" color="success" size="small" sx={{ fontWeight: 700 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="subtitle2" fontWeight={700}>YOLOv8 Inference Worker</Typography>
              <Typography variant="caption" color="text.secondary">PyTorch CUDA Engine</Typography>
              <Box sx={{ mt: 1 }}>
                <Chip label="GPU READY (0.014s)" color="success" size="small" sx={{ fontWeight: 700 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" fontWeight={700} color="primary.dark" gutterBottom>
          Live Infrastructure Log Stream
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ bgcolor: '#111827', color: '#10B981', p: 2.5, borderRadius: 2, fontFamily: 'monospace', fontSize: 13 }}>
          <div>[INFO 09:14:02] Spring Boot HikariPool-1 - Connection is valid.</div>
          <div>[INFO 09:14:12] Python Watchdog: Scan completed on datasets/incoming_images/ (0 new files).</div>
          <div>[INFO 09:14:22] React Frontend Polling: GET /api/monitoring/status 200 OK (12ms)</div>
          <div>[INFO 09:14:35] AI Inference Service: Warm standby active on CUDA Device:0</div>
        </Box>
      </Paper>
    </DashboardLayout>
  )
}
