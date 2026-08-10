import { useState, useEffect } from 'react'
import {
  Box, Typography, Grid, Paper, TextField, FormControl, InputLabel,
  Select, MenuItem, Button, InputAdornment, Stack, CircularProgress
} from '@mui/material'
import {
  Search, FilterList, Refresh, PhotoLibrary, Visibility, Pets,
  NotificationsActive, WatchLater, CheckCircle
} from '@mui/icons-material'
import DashboardLayout from '../../layouts/DashboardLayout'
import DetectionTable from '../../components/DetectionTable'
import DetectionDetailModal from '../../components/DetectionDetailModal'
import ErrorBanner from '../../components/ErrorBanner'
import { getDetections } from '../../services/detectionService'

const officerNavItems = [
  { label: 'Dashboard', path: '/officer/dashboard', icon: <PhotoLibrary fontSize="small" /> },
  { label: 'AI Monitoring', path: '/officer/monitoring', icon: <Visibility fontSize="small" /> },
  { label: 'Detection History', path: '/officer/history', icon: <Pets fontSize="small" /> },
  { label: 'Alerts', path: '/officer/alerts', icon: <NotificationsActive fontSize="small" /> },
  { label: 'Reports', path: '/officer/reports', icon: <WatchLater fontSize="small" /> },
  { label: 'Settings', path: '/officer/settings', icon: <CheckCircle fontSize="small" /> },
]

export default function DetectionHistory() {
  const [detections, setDetections] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDetection, setSelectedDetection] = useState(null)

  // Filters
  const [searchTerm, setSearchTerm] = useState('')
  const [animalFilter, setAnimalFilter] = useState('ALL')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [minConfidence, setMinConfidence] = useState('')

  const fetchDetections = async () => {
    setLoading(true)
    try {
      const data = await getDetections({
        animal: animalFilter,
        status: statusFilter,
        minConfidence,
      })
      setDetections(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDetections()
  }, [animalFilter, statusFilter, minConfidence])

  const filteredRows = detections.filter(d => {
    if (!searchTerm) return true
    const term = searchTerm.toLowerCase()
    return (
      d.animalName?.toLowerCase().includes(term) ||
      d.location?.toLowerCase().includes(term) ||
      d.status?.toLowerCase().includes(term)
    )
  })

  return (
    <DashboardLayout sidebarItems={officerNavItems} sidebarTitle="Forest Officer" pageTitle="Wildlife Detection History">
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h5" fontWeight={700} color="primary.dark">
            Complete Wildlife Detection Archive
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Filter, search, and verify AI camera trap detections across reserve zones
          </Typography>
        </Box>
        <Button startIcon={<Refresh />} variant="outlined" size="small" onClick={fetchDetections}>
          Reload History
        </Button>
      </Box>

      <ErrorBanner />

      {/* Search & Filters Bar */}
      <Paper sx={{ p: 2.5, mb: 3, borderRadius: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search species, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={6} sm={4} md={2.5}>
            <FormControl fullWidth size="small">
              <InputLabel>Species</InputLabel>
              <Select
                value={animalFilter}
                label="Species"
                onChange={(e) => setAnimalFilter(e.target.value)}
              >
                <MenuItem value="ALL">All Species</MenuItem>
                <MenuItem value="Bengal Tiger">Bengal Tiger</MenuItem>
                <MenuItem value="Asian Elephant">Asian Elephant</MenuItem>
                <MenuItem value="Indian Leopard">Indian Leopard</MenuItem>
                <MenuItem value="Spotted Deer">Spotted Deer</MenuItem>
                <MenuItem value="Indian Gaur">Indian Gaur</MenuItem>
                <MenuItem value="Sloth Bear">Sloth Bear</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} sm={4} md={2.5}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="ALL">All Statuses</MenuItem>
                <MenuItem value="CONFIRMED">Confirmed</MenuItem>
                <MenuItem value="PENDING">Pending Review</MenuItem>
                <MenuItem value="FALSE_POSITIVE">False Positive</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} sm={4} md={2.5}>
            <FormControl fullWidth size="small">
              <InputLabel>Min Confidence</InputLabel>
              <Select
                value={minConfidence}
                label="Min Confidence"
                onChange={(e) => setMinConfidence(e.target.value)}
              >
                <MenuItem value="">Any Confidence</MenuItem>
                <MenuItem value="0.90">90%+ High</MenuItem>
                <MenuItem value="0.80">80%+ Medium</MenuItem>
                <MenuItem value="0.70">70%+ Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} md={1.5}>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              size="small"
              onClick={() => {
                setSearchTerm('')
                setAnimalFilter('ALL')
                setStatusFilter('ALL')
                setMinConfidence('')
              }}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Detection Table */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <DetectionTable
          rows={filteredRows}
          onView={(d) => setSelectedDetection(d)}
        />
      )}

      {/* Detection Detail Modal */}
      <DetectionDetailModal
        open={Boolean(selectedDetection)}
        onClose={() => setSelectedDetection(null)}
        detection={selectedDetection}
      />
    </DashboardLayout>
  )
}
