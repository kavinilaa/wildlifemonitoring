import { useState, useEffect } from 'react'
import {
  Grid, Box, Typography, Card, CardContent, Paper, Button, CircularProgress, Chip, Divider
} from '@mui/material'
import {
  Dashboard as DashIcon, Storage, ModelTraining as TrainIcon, Assessment,
  Biotech, Timeline, Description, Settings, Refresh, CloudUpload
} from '@mui/icons-material'
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
  BarChart, Bar
} from 'recharts'
import DashboardLayout from '../../layouts/DashboardLayout'
import StatCard from '../../components/StatCard'
import ErrorBanner from '../../components/ErrorBanner'
import { getResearcherDashboard } from '../../services/dashboardService'

const researcherNavItems = [
  { label: 'Dashboard', path: '/researcher/dashboard', icon: <DashIcon fontSize="small" /> },
  { label: 'Dataset Management', path: '/researcher/datasets', icon: <Storage fontSize="small" /> },
  { label: 'Model Training', path: '/researcher/training', icon: <TrainIcon fontSize="small" /> },
  { label: 'Model Evaluation', path: '/researcher/evaluation', icon: <Assessment fontSize="small" /> },
  { label: 'AI Image Upload', path: '/ai-monitoring', icon: <CloudUpload fontSize="small" /> },
  { label: 'Prediction Testing', path: '/researcher/testing', icon: <Biotech fontSize="small" /> },
  { label: 'Research Analytics', path: '/researcher/analytics', icon: <Timeline fontSize="small" /> },
  { label: 'Reports', path: '/researcher/reports', icon: <Description fontSize="small" /> },
  { label: 'Settings', path: '/researcher/settings', icon: <Settings fontSize="small" /> },
]

export default function ResearcherDashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const res = await getResearcherDashboard()
      setData(res)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return (
      <DashboardLayout sidebarItems={researcherNavItems} sidebarTitle="Researcher" pageTitle="Research & ML Workbench Dashboard">
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress color="primary" />
        </Box>
      </DashboardLayout>
    )
  }

  const {
    trainingImages = 45200, validationImages = 8500, testingImages = 6200,
    numberOfClasses = 12, currentModel = 'WildLumina-YOLOv8x-v2.1',
    precision = 0.948, recall = 0.926, mAP50 = 0.954, mAP50_95 = 0.812,
    epochMetrics = [], classPerformance = []
  } = data || {}

  return (
    <DashboardLayout sidebarItems={researcherNavItems} sidebarTitle="Researcher" pageTitle="Research & ML Benchmark Dashboard">
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h5" fontWeight={700} color="primary.dark">
            AI Model Performance & Ecological Research Hub
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Evaluation metrics, training dataset splits, and species detection benchmarks
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Chip label={`Model: ${currentModel}`} color="primary" sx={{ fontWeight: 700 }} />
          <Button startIcon={<Refresh />} variant="outlined" size="small" onClick={fetchData}>
            Refresh
          </Button>
        </Box>
      </Box>

      <ErrorBanner />

      {/* 9 Key Metrics Cards */}
      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3} lg={1.33}>
          <StatCard title="Training Images" value={trainingImages?.toLocaleString()} icon={<Storage />} color="#2E7D32" />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={1.33}>
          <StatCard title="Val Images" value={validationImages?.toLocaleString()} icon={<Storage />} color="#4CAF50" />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={1.33}>
          <StatCard title="Test Images" value={testingImages?.toLocaleString()} icon={<Storage />} color="#7B68EE" />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={1.33}>
          <StatCard title="Classes" value={numberOfClasses} icon={<Biotech />} color="#1565C0" />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={1.33}>
          <StatCard title="Precision" value={`${(precision * 100).toFixed(1)}%`} icon={<Assessment />} color="#00897B" />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={1.33}>
          <StatCard title="Recall" value={`${(recall * 100).toFixed(1)}%`} icon={<Assessment />} color="#F57C00" />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={1.33}>
          <StatCard title="mAP50" value={`${(mAP50 * 100).toFixed(1)}%`} icon={<Assessment />} color="#D32F2F" />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={1.33}>
          <StatCard title="mAP50-95" value={`${(mAP50_95 * 100).toFixed(1)}%`} icon={<Assessment />} color="#9C27B0" />
        </Grid>
      </Grid>

      {/* Model Performance & Epoch Graphs */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3, borderRadius: 3, height: 380 }}>
            <Typography variant="h6" fontWeight={700} color="primary.dark" mb={2}>
              Training Progress & Validation Loss Curves (Epoch 1 - 50)
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={epochMetrics}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="epoch" name="Epoch" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="map50" stroke="#2E7D32" strokeWidth={3} name="mAP50 Accuracy" />
                <Line type="monotone" dataKey="loss" stroke="#D32F2F" strokeWidth={2} name="Training Loss" />
                <Line type="monotone" dataKey="valLoss" stroke="#7B68EE" strokeWidth={2} name="Validation Loss" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, borderRadius: 3, height: 380 }}>
            <Typography variant="h6" fontWeight={700} color="primary.dark" mb={2}>
              Per-Class mAP50 Accuracy
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={classPerformance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis type="number" domain={[0.8, 1.0]} />
                <YAxis type="category" dataKey="class" width={110} />
                <Tooltip />
                <Bar dataKey="map50" fill="#7B68EE" name="mAP50 Score" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </DashboardLayout>
  )
}
