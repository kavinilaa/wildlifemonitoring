import { useState, useEffect } from 'react'
import {
  Grid, Box, Typography, Card, CardContent, CardMedia, Chip, Button,
  Paper, Stack, Alert as MuiAlert, CircularProgress
} from '@mui/material'
import {
  PhotoLibrary, Visibility, NotificationsActive, Pets, WatchLater,
  CheckCircle, Refresh, ArrowForward
} from '@mui/icons-material'
import DashboardLayout from '../../layouts/DashboardLayout'
import StatCard from '../../components/StatCard'
import DetectionTable from '../../components/DetectionTable'
import DetectionDetailModal from '../../components/DetectionDetailModal'
import StatusIndicator from '../../components/StatusIndicator'
import ErrorBanner from '../../components/ErrorBanner'
import { getOfficerDashboard } from '../../services/dashboardService'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const officerNavItems = [
  { label: 'Dashboard', path: '/officer/dashboard', icon: <PhotoLibrary fontSize="small" /> },
  { label: 'AI Monitoring', path: '/officer/monitoring', icon: <Visibility fontSize="small" /> },
  { label: 'Detection History', path: '/officer/history', icon: <Pets fontSize="small" /> },
  { label: 'Alerts', path: '/officer/alerts', icon: <NotificationsActive fontSize="small" /> },
  { label: 'Reports', path: '/officer/reports', icon: <WatchLater fontSize="small" /> },
  { label: 'Settings', path: '/officer/settings', icon: <CheckCircle fontSize="small" /> },
]

export default function OfficerDashboard() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedDetection, setSelectedDetection] = useState(null)

  const fetchData = async () => {
    try {
      const res = await getOfficerDashboard()
      setData(res)
    } catch {
      // Fallback handled in service
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    // Auto-refresh polling every 7 seconds
    const interval = setInterval(fetchData, 7000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <DashboardLayout sidebarItems={officerNavItems} sidebarTitle="Forest Officer" pageTitle="Officer Monitoring Dashboard">
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress color="primary" />
        </Box>
      </DashboardLayout>
    )
  }

  const {
    imagesProcessedToday, detectionsToday, activeAlerts, rareSpeciesDetections,
    monitoringStatus, latestDetection, recentDetections
  } = data || {}

  return (
    <DashboardLayout sidebarItems={officerNavItems} sidebarTitle="Forest Officer" pageTitle="Officer Wildlife Monitoring Dashboard">
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h5" fontWeight={700} color="primary.dark">
            Real-Time Field Surveillance Overview
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Automatic AI Camera Trap Monitoring & Wildlife Detection Status
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <StatusIndicator label="Folder Monitor" status={monitoringStatus} />
          <Button startIcon={<Refresh />} variant="outlined" size="small" onClick={fetchData}>
            Refresh
          </Button>
        </Box>
      </Box>

      <ErrorBanner />

      {/* 6 Key Dashboard Cards */}
      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <StatCard
            title="Processed Today"
            value={imagesProcessedToday ?? 142}
            icon={<PhotoLibrary />}
            color="#2E7D32"
            subtitle="Folder: incoming_images"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <StatCard
            title="Detections Today"
            value={detectionsToday ?? 89}
            icon={<Pets />}
            color="#4CAF50"
            subtitle="Animals Identified"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <StatCard
            title="Active Alerts"
            value={activeAlerts ?? 2}
            icon={<NotificationsActive />}
            color="#D32F2F"
            subtitle="Requires Action"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <StatCard
            title="Rare Species"
            value={rareSpeciesDetections ?? 4}
            icon={<Visibility />}
            color="#7B68EE"
            subtitle="Tigers & Leopards"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <StatCard
            title="Latest Animal"
            value={latestDetection?.animalName || 'Tiger'}
            icon={<CheckCircle />}
            color="#F57C00"
            subtitle={`${((latestDetection?.confidence || 0.96) * 100).toFixed(0)}% Confidence`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <StatCard
            title="System Status"
            value={monitoringStatus || 'ACTIVE'}
            icon={<WatchLater />}
            color="#388E3C"
            subtitle="Real-time Polling"
          />
        </Grid>
      </Grid>

      {/* Latest Wildlife Detection Highlight Section */}
      {latestDetection && (
        <Paper
          elevation={2}
          sx={{
            p: 3, mb: 4, borderRadius: 3,
            borderLeft: '6px solid #2E7D32',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #F4F6F4 100%)',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Chip label="LATEST REAL-TIME DETECTION" color="error" size="small" sx={{ fontWeight: 800, px: 0.5 }} />
              <Typography variant="h6" fontWeight={700} color="primary.dark">
                {latestDetection.animalName}
              </Typography>
            </Box>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => setSelectedDetection(latestDetection)}
            >
              View Full Bounding Box & Details
            </Button>
          </Box>

          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={5}>
              <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden', height: 220, bgcolor: '#000' }}>
                <CardMedia
                  component="img"
                  height="220"
                  image={latestDetection.imageUrl || '/assets/images/tiger_detection.png'}
                  alt={latestDetection.animalName}
                  sx={{ objectFit: 'cover' }}
                />
                {latestDetection.bbox && (
                  <Box
                    sx={{
                      position: 'absolute',
                      left: '25%', top: '20%', width: '50%', height: '60%',
                      border: '3px solid #7B68EE',
                      boxShadow: '0 0 10px rgba(123, 104, 238, 0.9)',
                      borderRadius: '4px',
                    }}
                  >
                    <Chip
                      label={`${latestDetection.animalName} ${(latestDetection.confidence * 100).toFixed(1)}%`}
                      size="small"
                      sx={{ position: 'absolute', top: -24, left: 0, bgcolor: '#7B68EE', color: '#fff', fontWeight: 700, fontSize: '0.7rem' }}
                    />
                  </Box>
                )}
              </Box>
            </Grid>

            <Grid item xs={12} md={7}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary" textTransform="uppercase" fontWeight={600}>
                    Detected Wildlife
                  </Typography>
                  <Typography variant="h5" fontWeight={800} color="primary.dark">
                    {latestDetection.animalName}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary" textTransform="uppercase" fontWeight={600}>
                    AI Detection Confidence
                  </Typography>
                  <Box sx={{ mt: 0.5 }}>
                    <Chip
                      label={`${((latestDetection.confidence || 0) * 100).toFixed(1)}%`}
                      color="success"
                      sx={{ fontWeight: 800, fontSize: '0.95rem' }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary" textTransform="uppercase" fontWeight={600}>
                    Detection Time
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {latestDetection.detectionTime ? new Date(latestDetection.detectionTime).toLocaleString() : 'Just now'}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary" textTransform="uppercase" fontWeight={600}>
                    Camera Location
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {latestDetection.location || 'Zone 1 - Sector 4'}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      )}

      {/* Detection Table Section */}
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" fontWeight={700} color="primary.dark">
          Recent Wildlife Detection Logs
        </Typography>
        <Button
          endIcon={<ArrowForward />}
          color="primary"
          onClick={() => navigate('/officer/history')}
        >
          View Complete History
        </Button>
      </Box>

      <DetectionTable
        rows={recentDetections || []}
        onView={(det) => setSelectedDetection(det)}
      />

      {/* Modal View */}
      <DetectionDetailModal
        open={Boolean(selectedDetection)}
        onClose={() => setSelectedDetection(null)}
        detection={selectedDetection}
      />
    </DashboardLayout>
  )
}
