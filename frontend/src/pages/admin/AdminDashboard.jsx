import { useState, useEffect } from 'react'
import {
  Grid, Box, Typography, Card, CardContent, Paper, Button, CircularProgress
} from '@mui/material'
import {
  Dashboard as DashIcon, People, Storage, Memory, MonitorHeart,
  Timeline, Assessment, Settings, Refresh, CloudUpload
} from '@mui/icons-material'
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip,
  CartesianGrid, PieChart, Pie, Cell, LineChart, Line, Legend, AreaChart, Area
} from 'recharts'
import DashboardLayout from '../../layouts/DashboardLayout'
import StatCard from '../../components/StatCard'
import StatusIndicator from '../../components/StatusIndicator'
import ErrorBanner from '../../components/ErrorBanner'
import { getAdminDashboard } from '../../services/dashboardService'

const adminNavItems = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: <DashIcon fontSize="small" /> },
  { label: 'User Management', path: '/admin/users', icon: <People fontSize="small" /> },
  { label: 'Dataset Management', path: '/admin/datasets', icon: <Storage fontSize="small" /> },
  { label: 'AI Model Management', path: '/admin/models', icon: <Memory fontSize="small" /> },
  { label: 'AI Image Upload', path: '/ai-monitoring', icon: <CloudUpload fontSize="small" /> },
  { label: 'System Monitoring', path: '/admin/monitoring', icon: <MonitorHeart fontSize="small" /> },
  { label: 'Analytics', path: '/admin/analytics', icon: <Timeline fontSize="small" /> },
  { label: 'Reports', path: '/admin/reports', icon: <Assessment fontSize="small" /> },
  { label: 'Settings', path: '/admin/settings', icon: <Settings fontSize="small" /> },
]

export default function AdminDashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const res = await getAdminDashboard()
      setData(res)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return (
      <DashboardLayout sidebarItems={adminNavItems} sidebarTitle="System Admin" pageTitle="System Administration Dashboard">
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress color="primary" />
        </Box>
      </DashboardLayout>
    )
  }

  const {
    totalUsers = 24, forestOfficers = 14, researchers = 8,
    imagesProcessed = 18450, totalDetections = 12380, activeAlerts = 3,
    aiModelStatus = 'LOADED', folderMonitoringStatus = 'ACTIVE',
    speciesDistribution = [], dailyDetections = [], systemActivity = []
  } = data || {}

  return (
    <DashboardLayout sidebarItems={adminNavItems} sidebarTitle="System Admin" pageTitle="System Administration & Master Overview">
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h5" fontWeight={700} color="primary.dark">
            WildLumina Central Command Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Master telemetry, user metrics, model status, and system analytics
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <StatusIndicator label="Folder Monitoring" status={folderMonitoringStatus} />
          <StatusIndicator label="AI Model" status={aiModelStatus} activeText="LOADED" inactiveText="NOT LOADED" />
          <Button startIcon={<Refresh />} variant="outlined" size="small" onClick={fetchData}>
            Refresh
          </Button>
        </Box>
      </Box>

      <ErrorBanner />

      {/* 8 Stats Cards */}
      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3} lg={1.5}>
          <StatCard title="Total Users" value={totalUsers} icon={<People />} color="#2E7D32" />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={1.5}>
          <StatCard title="Forest Officers" value={forestOfficers} icon={<People />} color="#4CAF50" />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={1.5}>
          <StatCard title="Researchers" value={researchers} icon={<People />} color="#7B68EE" />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={1.5}>
          <StatCard title="Images Processed" value={imagesProcessed?.toLocaleString()} icon={<Storage />} color="#1565C0" />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={1.5}>
          <StatCard title="Total Detections" value={totalDetections?.toLocaleString()} icon={<Memory />} color="#E65100" />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={1.5}>
          <StatCard title="Active Alerts" value={activeAlerts} icon={<MonitorHeart />} color="#D32F2F" />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={1.5}>
          <StatCard title="AI Model" value={aiModelStatus} icon={<Memory />} color="#388E3C" />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={1.5}>
          <StatCard title="Folder Status" value={folderMonitoringStatus} icon={<MonitorHeart />} color="#00897B" />
        </Grid>
      </Grid>

      {/* Recharts Analytics Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Daily Detection Count (AreaChart) */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3, borderRadius: 3, height: 380 }}>
            <Typography variant="h6" fontWeight={700} color="primary.dark" mb={2}>
              Daily Detections & Image Processing Volume
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dailyDetections}>
                <defs>
                  <linearGradient id="colorDetections" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#2E7D32" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorImages" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7B68EE" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#7B68EE" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="date" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Area type="monotone" dataKey="detections" stroke="#2E7D32" fillOpacity={1} fill="url(#colorDetections)" name="Animals Detected" />
                <Area type="monotone" dataKey="images" stroke="#7B68EE" fillOpacity={1} fill="url(#colorImages)" name="Camera Trap Images" />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Animal Detection Distribution (PieChart) */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, borderRadius: 3, height: 380 }}>
            <Typography variant="h6" fontWeight={700} color="primary.dark" mb={2}>
              Species Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={speciesDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={95}
                  dataKey="count"
                  nameKey="name"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {speciesDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill || '#2E7D32'} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* System Activity (LineChart) */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: 3, height: 340 }}>
            <Typography variant="h6" fontWeight={700} color="primary.dark" mb={2}>
              System Telemetry & Server Utilization (%)
            </Typography>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={systemActivity}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="time" />
                <YAxis domain={[0, 100]} />
                <RechartsTooltip />
                <Legend />
                <Line type="monotone" dataKey="cpu" stroke="#D32F2F" strokeWidth={2} name="CPU Load (%)" />
                <Line type="monotone" dataKey="memory" stroke="#7B68EE" strokeWidth={2} name="RAM Memory (%)" />
                <Line type="monotone" dataKey="storage" stroke="#2E7D32" strokeWidth={2} name="Storage (%)" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </DashboardLayout>
  )
}
