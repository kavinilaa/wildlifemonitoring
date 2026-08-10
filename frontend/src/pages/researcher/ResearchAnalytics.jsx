import { Box, Typography, Paper } from '@mui/material'
import {
  Timeline, Dashboard as DashIcon, Storage, ModelTraining as TrainIcon,
  Assessment, Biotech, Description, Settings
} from '@mui/icons-material'
import DashboardLayout from '../../layouts/DashboardLayout'

const researcherNavItems = [
  { label: 'Dashboard', path: '/researcher/dashboard', icon: <DashIcon fontSize="small" /> },
  { label: 'Dataset Management', path: '/researcher/datasets', icon: <Storage fontSize="small" /> },
  { label: 'Model Training', path: '/researcher/training', icon: <TrainIcon fontSize="small" /> },
  { label: 'Model Evaluation', path: '/researcher/evaluation', icon: <Assessment fontSize="small" /> },
  { label: 'Prediction Testing', path: '/researcher/testing', icon: <Biotech fontSize="small" /> },
  { label: 'Research Analytics', path: '/researcher/analytics', icon: <Timeline fontSize="small" /> },
  { label: 'Reports', path: '/researcher/reports', icon: <Description fontSize="small" /> },
  { label: 'Settings', path: '/researcher/settings', icon: <Settings fontSize="small" /> },
]

export default function ResearcherAnalytics() {
  return (
    <DashboardLayout sidebarItems={researcherNavItems} sidebarTitle="Researcher" pageTitle="Ecological Analytics & Behavior">
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} color="primary.dark">
          Ecological Movement & Diel Activity Patterns
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Nocturnal vs diurnal wildlife activity profiles and predator-prey density maps
        </Typography>
      </Box>

      <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
        <Typography variant="h6" fontWeight={700} color="primary.dark" gutterBottom>
          Wildlife Activity Timeline & Micro-Climate Biomarkers
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Integrated time-series ecological analytics active across 14 Mudumalai camera trap grids.
        </Typography>
      </Paper>
    </DashboardLayout>
  )
}
