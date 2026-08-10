import { useState } from 'react'
import {
  Box, Typography, Grid, Paper, Card, CardContent, TextField,
  Button, Switch, FormControlLabel, Divider, Alert, Avatar, Chip
} from '@mui/material'
import {
  Save, PhotoLibrary, Visibility, Pets, NotificationsActive,
  WatchLater, CheckCircle, Shield
} from '@mui/icons-material'
import DashboardLayout from '../../layouts/DashboardLayout'
import { useAuth } from '../../context/AuthContext'

const officerNavItems = [
  { label: 'Dashboard', path: '/officer/dashboard', icon: <PhotoLibrary fontSize="small" /> },
  { label: 'AI Monitoring', path: '/officer/monitoring', icon: <Visibility fontSize="small" /> },
  { label: 'Detection History', path: '/officer/history', icon: <Pets fontSize="small" /> },
  { label: 'Alerts', path: '/officer/alerts', icon: <NotificationsActive fontSize="small" /> },
  { label: 'Reports', path: '/officer/reports', icon: <WatchLater fontSize="small" /> },
  { label: 'Settings', path: '/officer/settings', icon: <CheckCircle fontSize="small" /> },
]

export default function OfficerSettings() {
  const { user } = useAuth()
  const [success, setSuccess] = useState(false)
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [smsAlerts, setSmsAlerts] = useState(true)
  const [soundAlerts, setSoundAlerts] = useState(true)

  const handleSave = (e) => {
    e.preventDefault()
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <DashboardLayout sidebarItems={officerNavItems} sidebarTitle="Forest Officer" pageTitle="Officer Station Settings">
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} color="primary.dark">
          Officer Profile & Alert Notification Preferences
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage station details, camera trap alert sound toggles, and notification routing
        </Typography>
      </Box>

      {success && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
          Settings updated successfully!
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Profile Details */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main', fontSize: 24, fontWeight: 700 }}>
                  {user?.fullName?.[0] || 'F'}
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight={700}>{user?.fullName || 'Karan Singh, IFS'}</Typography>
                  <Chip label={`Login ID: ${user?.loginId || 'FO1001'}`} color="primary" size="small" sx={{ fontWeight: 600 }} />
                </Box>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Box component="form" onSubmit={handleSave} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField fullWidth label="Official Email" defaultValue={user?.email || 'karan.singh@forest.gov.in'} />
                <TextField fullWidth label="Phone Number" defaultValue={user?.phone || '+91 98123 45678'} />
                <TextField fullWidth label="Forest Zone" defaultValue={user?.forestZone || 'Southern Western Ghats'} />
                <TextField fullWidth label="Forest Range" defaultValue={user?.forestRange || 'Mudumalai Range'} />
                <TextField fullWidth label="Station Checkpost" defaultValue={user?.stationName || 'Theppakadu Checkpost'} />

                <Button type="submit" variant="contained" color="primary" startIcon={<Save />} sx={{ mt: 1, py: 1.2, fontWeight: 700 }}>
                  Save Profile Changes
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Alert Toggles */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={700} color="primary.dark" gutterBottom>
                Field Notification Settings
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControlLabel
                  control={<Switch checked={emailAlerts} onChange={(e) => setEmailAlerts(e.target.checked)} color="primary" />}
                  label="Instant Email Alerts on Rare Apex Predator Detection (Tigers/Leopards)"
                />
                <FormControlLabel
                  control={<Switch checked={smsAlerts} onChange={(e) => setSmsAlerts(e.target.checked)} color="primary" />}
                  label="SMS Critical Alerts for Human-Wildlife Conflict Intrusion"
                />
                <FormControlLabel
                  control={<Switch checked={soundAlerts} onChange={(e) => setSoundAlerts(e.target.checked)} color="primary" />}
                  label="Play Sound Warning in Browser on High Severity Alert"
                />
              </Box>

              <Divider sx={{ my: 3 }} />

              <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                Polling Refresh Rate
              </Typography>
              <Typography variant="caption" color="text.secondary" paragraph>
                Dashboard auto-refreshes folder monitoring state every 5 seconds.
              </Typography>
              <Chip label="Real-Time Polling: 5 SECONDS" color="success" variant="outlined" sx={{ fontWeight: 700 }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  )
}
