import { useState } from 'react'
import {
  Box, Typography, Grid, Paper, Button, FormControl, InputLabel,
  Select, MenuItem, TextField, Card, CardContent, Divider, Alert
} from '@mui/material'
import {
  PictureAsPdf, Download, PhotoLibrary, Visibility, Pets,
  NotificationsActive, WatchLater, CheckCircle
} from '@mui/icons-material'
import DashboardLayout from '../../layouts/DashboardLayout'

const officerNavItems = [
  { label: 'Dashboard', path: '/officer/dashboard', icon: <PhotoLibrary fontSize="small" /> },
  { label: 'AI Monitoring', path: '/officer/monitoring', icon: <Visibility fontSize="small" /> },
  { label: 'Detection History', path: '/officer/history', icon: <Pets fontSize="small" /> },
  { label: 'Alerts', path: '/officer/alerts', icon: <NotificationsActive fontSize="small" /> },
  { label: 'Reports', path: '/officer/reports', icon: <WatchLater fontSize="small" /> },
  { label: 'Settings', path: '/officer/settings', icon: <CheckCircle fontSize="small" /> },
]

export default function OfficerReports() {
  const [reportType, setReportType] = useState('DAILY_SUMMARY')
  const [format, setFormat] = useState('PDF')
  const [range, setRange] = useState('Mudumalai Sector 1')
  const [downloadSuccess, setDownloadSuccess] = useState(false)

  const handleGenerate = (e) => {
    e.preventDefault()
    setDownloadSuccess(true)
    setTimeout(() => setDownloadSuccess(false), 4000)
  }

  return (
    <DashboardLayout sidebarItems={officerNavItems} sidebarTitle="Forest Officer" pageTitle="Wildlife Surveillance Reports">
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} color="primary.dark">
          Official Range Activity & Wildlife Reports
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Export verified detection summaries, species movement tallies, and alert resolution logs
        </Typography>
      </Box>

      {downloadSuccess && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
          Report generated and downloaded successfully in {format} format!
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={700} color="primary.dark" gutterBottom>
                Generate Custom Field Report
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Box component="form" onSubmit={handleGenerate} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <FormControl fullWidth>
                  <InputLabel>Report Type</InputLabel>
                  <Select
                    value={reportType}
                    label="Report Type"
                    onChange={(e) => setReportType(e.target.value)}
                  >
                    <MenuItem value="DAILY_SUMMARY">Daily Camera Trap Summary</MenuItem>
                    <MenuItem value="RARE_SPECIES">Apex Predator & Rare Species Log</MenuItem>
                    <MenuItem value="CONFLICT_ALERT">Human-Wildlife Conflict Incident Log</MenuItem>
                    <MenuItem value="MONTHLY_AUDIT">Monthly Range Ecological Audit</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Forest Range / Sector</InputLabel>
                  <Select
                    value={range}
                    label="Forest Range / Sector"
                    onChange={(e) => setRange(e.target.value)}
                  >
                    <MenuItem value="Mudumalai Sector 1">Mudumalai Range (Sector 1 - 4)</MenuItem>
                    <MenuItem value="Bandipur Sector 2">Bandipur Range (Corridor B)</MenuItem>
                    <MenuItem value="Anamalai Sector 3">Anamalai Sanctuary Sector</MenuItem>
                    <MenuItem value="Wayanad Sector 4">Wayanad Reserve Sector</MenuItem>
                  </Select>
                </FormControl>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField fullWidth label="From Date" type="date" defaultValue="2026-08-01" InputLabelProps={{ shrink: true }} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth label="To Date" type="date" defaultValue="2026-08-10" InputLabelProps={{ shrink: true }} />
                  </Grid>
                </Grid>

                <FormControl fullWidth>
                  <InputLabel>Export File Format</InputLabel>
                  <Select
                    value={format}
                    label="Export File Format"
                    onChange={(e) => setFormat(e.target.value)}
                  >
                    <MenuItem value="PDF">PDF Official Document (.pdf)</MenuItem>
                    <MenuItem value="CSV">CSV Data Spreadsheet (.csv)</MenuItem>
                  </Select>
                </FormControl>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={format === 'PDF' ? <PictureAsPdf /> : <Download />}
                  sx={{ mt: 1, py: 1.3, fontWeight: 700 }}
                >
                  Generate & Export Report
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3, bgcolor: 'background.paper', height: '100%' }}>
            <Typography variant="h6" fontWeight={700} color="primary.dark" gutterBottom>
              Recent Generated Reports
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="subtitle2" fontWeight={700}>Daily_Detection_Report_20260810.pdf</Typography>
                <Typography variant="caption" color="text.secondary" display="block">Range: Mudumalai Sector 1 • Size: 2.4 MB</Typography>
                <Button size="small" startIcon={<Download />} sx={{ mt: 1 }}>Download Copy</Button>
              </Paper>

              <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="subtitle2" fontWeight={700}>Tiger_Predator_Log_Aug2026.csv</Typography>
                <Typography variant="caption" color="text.secondary" display="block">Range: All Zones • Size: 840 KB</Typography>
                <Button size="small" startIcon={<Download />} sx={{ mt: 1 }}>Download Copy</Button>
              </Paper>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </DashboardLayout>
  )
}
