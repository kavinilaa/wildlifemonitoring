import { useState } from 'react'
import { Box, Typography, Paper, Card, CardContent, Button, Divider, Alert } from '@mui/material'
import {
  Description, Download, PictureAsPdf, Dashboard as DashIcon, Storage,
  ModelTraining as TrainIcon, Assessment, Biotech, Timeline, Settings
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

export default function ResearcherReports() {
  const [success, setSuccess] = useState(false)

  const handleGenerate = () => {
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <DashboardLayout sidebarItems={researcherNavItems} sidebarTitle="Researcher" pageTitle="Scientific Research Reports">
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} color="primary.dark">
          Research Paper Data Exporter & Citation Metrics
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Export precision tables, confusion matrices, and dataset statistics for publications
        </Typography>
      </Box>

      {success && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
          Scientific Research Report exported successfully!
        </Alert>
      )}

      <Card sx={{ borderRadius: 3, maxWidth: 600 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={700} color="primary.dark" gutterBottom>
            Export ML Benchmark Report
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body2" color="text.secondary" paragraph>
            Includes YOLOv8 architecture hyperparameters, confusion matrix values, precision-recall curve points, and per-class AP50.
          </Typography>
          <Button variant="contained" color="primary" startIcon={<PictureAsPdf />} onClick={handleGenerate} sx={{ fontWeight: 700 }}>
            Export Benchmark Document (PDF)
          </Button>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
