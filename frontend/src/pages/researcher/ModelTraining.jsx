import { Box, Typography, Paper, Grid, Card, CardContent, LinearProgress, Chip, Divider, Button } from '@mui/material'
import {
  ModelTraining as TrainIcon, PlayArrow, Dashboard as DashIcon, Storage, Assessment,
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

export default function ResearcherModelTraining() {
  return (
    <DashboardLayout sidebarItems={researcherNavItems} sidebarTitle="Researcher" pageTitle="YOLO Model Training Pipeline">
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} color="primary.dark">
          YOLO Architecture Fine-Tuning & Hyperparameter Pipeline
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Monitor active PyTorch training epochs, learning rates, and box loss convergence
        </Typography>
      </Box>

      <Card sx={{ borderRadius: 3, mb: 4 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box>
              <Typography variant="h6" fontWeight={700}>Active Run: WildLumina-YOLOv8x-v2.1</Typography>
              <Typography variant="caption" color="text.secondary">Epoch 50 of 50 Completed • Convergence Achieved</Typography>
            </Box>
            <Chip label="TRAINING COMPLETED" color="success" sx={{ fontWeight: 700 }} />
          </Box>
          <LinearProgress variant="determinate" value={100} sx={{ height: 10, borderRadius: 2, mb: 2 }} />
        </CardContent>
      </Card>

      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" fontWeight={700} color="primary.dark" gutterBottom>
          Training Hyperparameters Config
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={6} md={3}>
            <Typography variant="caption" color="text.secondary">Base Learning Rate (lr0)</Typography>
            <Typography variant="subtitle1" fontWeight={700}>0.01</Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="caption" color="text.secondary">Batch Size</Typography>
            <Typography variant="subtitle1" fontWeight={700}>16 (Distributed GPU)</Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="caption" color="text.secondary">Image Resolution</Typography>
            <Typography variant="subtitle1" fontWeight={700}>640 x 640 px</Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="caption" color="text.secondary">Optimizer</Typography>
            <Typography variant="subtitle1" fontWeight={700}>SGD (momentum=0.937)</Typography>
          </Grid>
        </Grid>
      </Paper>
    </DashboardLayout>
  )
}
