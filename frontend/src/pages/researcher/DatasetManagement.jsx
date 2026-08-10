import { Box, Typography, Grid, Paper, Card, CardContent, Divider, Chip } from '@mui/material'
import {
  Storage, Dashboard as DashIcon, ModelTraining as TrainIcon, Assessment,
  Biotech, Timeline, Description, Settings
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

export default function ResearcherDatasetManagement() {
  return (
    <DashboardLayout sidebarItems={researcherNavItems} sidebarTitle="Researcher" pageTitle="Annotation & Dataset Curation">
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} color="primary.dark">
          YOLO Annotation & Training Dataset Curation
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Class balancing, bounding box annotation format inspection, and data augmentation settings
        </Typography>
      </Box>

      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" fontWeight={700} color="primary.dark" gutterBottom>
          Dataset Class Balance Overview
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={6} md={3}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 2 }}>
              <Typography variant="subtitle2" fontWeight={700}>Spotted Deer</Typography>
              <Typography variant="h6" color="primary.dark">8,200 samples</Typography>
              <Chip label="High Representation" color="success" size="small" sx={{ mt: 0.5 }} />
            </Paper>
          </Grid>
          <Grid item xs={6} md={3}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 2 }}>
              <Typography variant="subtitle2" fontWeight={700}>Asian Elephant</Typography>
              <Typography variant="h6" color="primary.dark">3,400 samples</Typography>
              <Chip label="Balanced" color="success" size="small" sx={{ mt: 0.5 }} />
            </Paper>
          </Grid>
          <Grid item xs={6} md={3}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 2 }}>
              <Typography variant="subtitle2" fontWeight={700}>Bengal Tiger</Typography>
              <Typography variant="h6" color="primary.dark">1,200 samples</Typography>
              <Chip label="Rare Species Target" color="warning" size="small" sx={{ mt: 0.5 }} />
            </Paper>
          </Grid>
          <Grid item xs={6} md={3}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 2 }}>
              <Typography variant="subtitle2" fontWeight={700}>Sloth Bear</Typography>
              <Typography variant="h6" color="primary.dark">610 samples</Typography>
              <Chip label="Augmentation Needed" color="error" size="small" sx={{ mt: 0.5 }} />
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </DashboardLayout>
  )
}
