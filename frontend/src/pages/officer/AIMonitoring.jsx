import { useState, useEffect } from 'react'
import {
  Box, Typography, Grid, Paper, Card, CardContent, CardMedia, Chip,
  Button, Alert, Divider, CircularProgress, Stack
} from '@mui/material'
import {
  FolderSpecial, Memory, Refresh, CheckCircle, Speed, Warning,
  Storage, Computer, ArrowRightAlt, PhotoLibrary, Visibility
} from '@mui/icons-material'
import DashboardLayout from '../../layouts/DashboardLayout'
import StatusIndicator from '../../components/StatusIndicator'
import DetectionDetailModal from '../../components/DetectionDetailModal'
import ErrorBanner from '../../components/ErrorBanner'
import { getMonitoringStatus, toggleFolderMonitoring } from '../../services/monitoringService'
import { getLatestDetection } from '../../services/detectionService'
import { motion } from 'framer-motion'

const officerNavItems = [
  { label: 'Dashboard', path: '/officer/dashboard', icon: <PhotoLibrary fontSize="small" /> },
  { label: 'AI Monitoring', path: '/officer/monitoring', icon: <Visibility fontSize="small" /> },
  { label: 'Detection History', path: '/officer/history', icon: <CheckCircle fontSize="small" /> },
  { label: 'Alerts', path: '/officer/alerts', icon: <Warning fontSize="small" /> },
  { label: 'Reports', path: '/officer/reports', icon: <Speed fontSize="small" /> },
  { label: 'Settings', path: '/officer/settings', icon: <Memory fontSize="small" /> },
]

export default function AIMonitoring() {
  const [status, setStatus] = useState(null)
  const [latest, setLatest] = useState(null)
  const [loading, setLoading] = useState(true)
  const [modalDetection, setModalDetection] = useState(null)
  const [toggleLoading, setToggleLoading] = useState(false)

  const fetchData = async () => {
    try {
      const [sRes, lRes] = await Promise.all([getMonitoringStatus(), getLatestDetection()])
      setStatus(sRes)
      setLatest(lRes)
    } catch {
      // Fallbacks in services
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    // Auto-polling refresh every 5 seconds for real-time monitoring display
    const interval = setInterval(fetchData, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleToggle = async () => {
    setToggleLoading(true)
    try {
      const current = status?.folderMonitoring === 'ACTIVE'
      const updated = await toggleFolderMonitoring(!current)
      setStatus(updated)
    } finally {
      setToggleLoading(false)
    }
  }

  if (loading) {
    return (
      <DashboardLayout sidebarItems={officerNavItems} sidebarTitle="Forest Officer" pageTitle="Automatic AI Monitoring System">
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress color="primary" />
        </Box>
      </DashboardLayout>
    )
  }

  const {
    folderMonitoring = 'ACTIVE',
    aiModelStatus = 'LOADED',
    modelName = 'WildLumina-YOLOv8x-v2.1',
    incomingFolderPath = 'datasets/incoming_images/',
    lastProcessedImage = 'IMG_20260810_084512_014.jpg',
    lastDetectedAnimal = 'Bengal Tiger',
    lastConfidence = 0.964,
    lastDetectionTime = '2026-08-10T08:45:12Z',
    imagesProcessedToday = 142,
    detectionsToday = 89,
  } = status || {}

  return (
    <DashboardLayout sidebarItems={officerNavItems} sidebarTitle="Forest Officer" pageTitle="Automatic AI Monitoring System">
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h5" fontWeight={700} color="primary.dark">
            Automatic Folder Monitoring & AI Engine Status
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Continuous background surveillance feed from field camera trap folders
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5}>
          <Button
            variant={folderMonitoring === 'ACTIVE' ? 'outlined' : 'contained'}
            color={folderMonitoring === 'ACTIVE' ? 'error' : 'success'}
            size="small"
            onClick={handleToggle}
            disabled={toggleLoading}
          >
            {folderMonitoring === 'ACTIVE' ? 'Pause Monitoring' : 'Start Monitoring'}
          </Button>
          <Button startIcon={<Refresh />} variant="outlined" size="small" onClick={fetchData}>
            Refresh Status
          </Button>
        </Stack>
      </Box>

      <ErrorBanner />

      {/* System Pipeline Banner */}
      <Paper sx={{ p: 2.5, mb: 3, borderRadius: 3, bgcolor: '#1B5E20', color: '#fff' }}>
        <Typography variant="subtitle2" textTransform="uppercase" letterSpacing={1} sx={{ opacity: 0.8, mb: 1 }}>
          System Data Flow Architecture
        </Typography>
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item xs={12} sm={3} textAlign="center">
            <Box sx={{ p: 1.5, bgcolor: 'rgba(255,255,255,0.12)', borderRadius: 2 }}>
              <FolderSpecial sx={{ fontSize: 32 }} />
              <Typography variant="body2" fontWeight={700} mt={0.5}>
                1. Incoming Folder
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8, display: 'block' }}>
                Python Watchdog
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3} textAlign="center">
            <Box sx={{ p: 1.5, bgcolor: 'rgba(255,255,255,0.12)', borderRadius: 2 }}>
              <Memory sx={{ fontSize: 32 }} />
              <Typography variant="body2" fontWeight={700} mt={0.5}>
                2. YOLOv8 Model
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8, display: 'block' }}>
                Object Inference
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3} textAlign="center">
            <Box sx={{ p: 1.5, bgcolor: 'rgba(255,255,255,0.12)', borderRadius: 2 }}>
              <Storage sx={{ fontSize: 32 }} />
              <Typography variant="body2" fontWeight={700} mt={0.5}>
                3. Spring Boot & MySQL
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8, display: 'block' }}>
                Persistence & Alerts
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3} textAlign="center">
            <Box sx={{ p: 1.5, bgcolor: 'rgba(255,255,255,0.12)', borderRadius: 2 }}>
              <Computer sx={{ fontSize: 32 }} />
              <Typography variant="body2" fontWeight={700} mt={0.5}>
                4. React UI (Polling 5s)
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8, display: 'block' }}>
                Real-Time Dashboard
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Main Status Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Status Indicators Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={700} color="primary.dark" gutterBottom>
                Folder & AI Engine Indicators
              </Typography>
              <Divider sx={{ mb: 2.5 }} />

              <Stack spacing={2.5}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>Folder Monitoring Status</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Monitored Path: <code>{incomingFolderPath}</code>
                    </Typography>
                  </Box>
                  <StatusIndicator status={folderMonitoring} />
                </Box>

                <Divider light />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>AI Detection Model State</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Model: <strong>{modelName}</strong>
                    </Typography>
                  </Box>
                  <StatusIndicator status={aiModelStatus} activeText="LOADED" inactiveText="NOT LOADED" />
                </Box>

                <Divider light />

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Paper elevation={0} sx={{ p: 2, bgcolor: 'primary.50', borderRadius: 2, border: '1px solid', borderColor: 'primary.100' }}>
                      <Typography variant="caption" color="text.secondary" textTransform="uppercase" fontWeight={600}>
                        Images Processed Today
                      </Typography>
                      <Typography variant="h4" fontWeight={800} color="primary.dark" mt={0.5}>
                        {imagesProcessedToday}
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={6}>
                    <Paper elevation={0} sx={{ p: 2, bgcolor: 'secondary.50', borderRadius: 2, border: '1px solid', borderColor: 'secondary.100' }}>
                      <Typography variant="caption" color="text.secondary" textTransform="uppercase" fontWeight={600}>
                        Animals Detected Today
                      </Typography>
                      <Typography variant="h4" fontWeight={800} color="secondary.dark" mt={0.5}>
                        {detectionsToday}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Last Processed Image & Detection Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={700} color="primary.dark" gutterBottom>
                Most Recent Automated Result
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }}>
                <Box
                  sx={{
                    width: { xs: '100%', sm: 180 },
                    height: 140,
                    borderRadius: 2,
                    overflow: 'hidden',
                    bgcolor: '#000',
                    flexShrink: 0,
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={latest?.imageUrl || '/assets/images/tiger_detection.png'}
                    alt={lastDetectedAnimal}
                    sx={{ objectFit: 'cover' }}
                  />
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" color="text.secondary" textTransform="uppercase" fontWeight={600}>
                    Last Detected Species
                  </Typography>
                  <Typography variant="h5" fontWeight={800} color="primary.dark">
                    {lastDetectedAnimal}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', my: 1 }}>
                    <Typography variant="body2" color="text.secondary">Confidence:</Typography>
                    <Chip
                      label={`${((lastConfidence || 0.964) * 100).toFixed(1)}%`}
                      color="success"
                      size="small"
                      sx={{ fontWeight: 700 }}
                    />
                  </Box>

                  <Typography variant="caption" color="text.secondary" display="block">
                    File: <strong>{lastProcessedImage}</strong>
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Time: {lastDetectionTime ? new Date(lastDetectionTime).toLocaleString() : '—'}
                  </Typography>

                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 1.5 }}
                    onClick={() => setModalDetection(latest)}
                  >
                    Inspect Detection
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <DetectionDetailModal
        open={Boolean(modalDetection)}
        onClose={() => setModalDetection(null)}
        detection={modalDetection}
      />
    </DashboardLayout>
  )
}
