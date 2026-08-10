import { useState } from 'react'
import { Box, Typography, Card, CardContent, TextField, Button, Divider, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import {
  Settings, Save, Dashboard as DashIcon, Storage, ModelTraining as TrainIcon,
  Assessment, Biotech, Timeline, Description
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

export default function ResearcherSettings() {
  const [success, setSuccess] = useState(false)
  const [annotationFormat, setAnnotationFormat] = useState('YOLO')
  const [confThreshold, setConfThreshold] = useState('0.45')

  const handleSave = (e) => {
    e.preventDefault()
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <DashboardLayout sidebarItems={researcherNavItems} sidebarTitle="Researcher" pageTitle="Research Workbench Settings">
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} color="primary.dark">
          Research Workbench & Export Preferences
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Configure default annotation formats, confidence thresholds, and PyTorch parameters
        </Typography>
      </Box>

      {success && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
          Research preferences saved successfully!
        </Alert>
      )}

      <Card sx={{ borderRadius: 3, maxWidth: 600 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={700} color="primary.dark" gutterBottom>
            Workbench Configurations
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Box component="form" onSubmit={handleSave} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <FormControl fullWidth>
              <InputLabel>Annotation Format Standard</InputLabel>
              <Select value={annotationFormat} label="Annotation Format Standard" onChange={(e) => setAnnotationFormat(e.target.value)}>
                <MenuItem value="YOLO">YOLO Format (.txt Normalized x,y,w,h)</MenuItem>
                <MenuItem value="COCO">COCO JSON Format (.json)</MenuItem>
                <MenuItem value="PASCAL_VOC">Pascal VOC XML (.xml)</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Default Inference Confidence Threshold (0.0 - 1.0)"
              value={confThreshold}
              onChange={(e) => setConfThreshold(e.target.value)}
            />

            <Button type="submit" variant="contained" color="primary" startIcon={<Save />} sx={{ py: 1.2, fontWeight: 700 }}>
              Save Research Preferences
            </Button>
          </Box>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
