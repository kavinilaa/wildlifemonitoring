import { useState, useEffect } from 'react'
import {
  Box, Typography, Grid, Paper, Tabs, Tab, Button, CircularProgress, Alert as MuiAlert
} from '@mui/material'
import {
  NotificationsActive, Refresh, PhotoLibrary, Visibility, Pets,
  WatchLater, CheckCircle, Warning
} from '@mui/icons-material'
import DashboardLayout from '../../layouts/DashboardLayout'
import AlertCard from '../../components/AlertCard'
import ErrorBanner from '../../components/ErrorBanner'
import { getAlerts, updateAlertStatus } from '../../services/alertService'

const officerNavItems = [
  { label: 'Dashboard', path: '/officer/dashboard', icon: <PhotoLibrary fontSize="small" /> },
  { label: 'AI Monitoring', path: '/officer/monitoring', icon: <Visibility fontSize="small" /> },
  { label: 'Detection History', path: '/officer/history', icon: <Pets fontSize="small" /> },
  { label: 'Alerts', path: '/officer/alerts', icon: <NotificationsActive fontSize="small" /> },
  { label: 'Reports', path: '/officer/reports', icon: <WatchLater fontSize="small" /> },
  { label: 'Settings', path: '/officer/settings', icon: <CheckCircle fontSize="small" /> },
]

export default function Alerts() {
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('ALL')

  const fetchAlerts = async () => {
    setLoading(true)
    try {
      const data = await getAlerts({ status: tab })
      setAlerts(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAlerts()
  }, [tab])

  const handleAcknowledge = async (alertItem) => {
    await updateAlertStatus(alertItem.id, 'ACKNOWLEDGED')
    fetchAlerts()
  }

  const handleResolve = async (alertItem) => {
    await updateAlertStatus(alertItem.id, 'RESOLVED')
    fetchAlerts()
  }

  return (
    <DashboardLayout sidebarItems={officerNavItems} sidebarTitle="Forest Officer" pageTitle="Real-Time Wildlife Alerts">
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h5" fontWeight={700} color="primary.dark">
            Surveillance & Risk Incident Alerts
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage intrusion, poaching risk, and human-wildlife conflict warnings
          </Typography>
        </Box>
        <Button startIcon={<Refresh />} variant="outlined" size="small" onClick={fetchAlerts}>
          Refresh Alerts
        </Button>
      </Box>

      <ErrorBanner />

      {/* Tabs Filter */}
      <Paper sx={{ mb: 3, borderRadius: 3 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          textColor="primary"
          indicatorColor="primary"
          sx={{ px: 2 }}
        >
          <Tab label="All Incidents" value="ALL" />
          <Tab label="Active (Requires Action)" value="ACTIVE" />
          <Tab label="Acknowledged" value="ACKNOWLEDGED" />
          <Tab label="Resolved Archive" value="RESOLVED" />
        </Tabs>
      </Paper>

      {/* Alerts Grid */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : alerts.length === 0 ? (
        <Paper sx={{ p: 5, textAlign: 'center', borderRadius: 3 }}>
          <CheckCircle sx={{ fontSize: 48, color: 'success.main', mb: 1 }} />
          <Typography variant="h6" fontWeight={600}>No alerts matching current filter</Typography>
          <Typography variant="body2" color="text.secondary">
            All reserve sectors are operating within normal parameters.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={2.5}>
          {alerts.map((alertItem) => (
            <Grid item xs={12} sm={6} md={4} key={alertItem.id}>
              <AlertCard
                alert={alertItem}
                onAcknowledge={handleAcknowledge}
                onResolve={handleResolve}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </DashboardLayout>
  )
}
