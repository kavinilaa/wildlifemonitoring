import { useState } from 'react'
import {
  Box, Typography, Grid, Paper, Card, CardContent, Button, Chip,
  Divider, CircularProgress, Alert
} from '@mui/material'
import {
  Biotech, UploadFile, PlayArrow, CheckCircle, Dashboard as DashIcon,
  Storage, ModelTraining as TrainIcon, Assessment, Timeline, Description, Settings
} from '@mui/icons-material'
import DashboardLayout from '../../layouts/DashboardLayout'
import { runPredictionTest } from '../../services/modelService'

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

export default function ResearcherPredictionTesting() {
  const [selectedImage, setSelectedImage] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    setSelectedFile(file)
    setSelectedImage(URL.createObjectURL(file))
  }

  const handleTest = async () => {
    if (!selectedFile) {
      setResult({
        animalName: 'No image selected',
        confidence: 0,
        modelUsed: 'WildLumina-YOLOv8x-v2.1',
        processingTimeMs: 0,
        bbox: { x1: 0, y1: 0, x2: 0, y2: 0 },
      })
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      const data = await runPredictionTest(formData)
      setResult(data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout sidebarItems={researcherNavItems} sidebarTitle="Researcher" pageTitle="Interactive Model Inference Workbench">
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} color="primary.dark">
          Single Image Prediction Workbench
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Test YOLO inference model against custom camera trap samples and inspect bounding box coordinates
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={700} color="primary.dark" gutterBottom>
                Test Image Sample
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{ borderRadius: 2, overflow: 'hidden', bgcolor: '#000', height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                {selectedImage ? (
                  <Box component="img" src={selectedImage} alt="Test Sample" sx={{ maxWidth: '100%', maxHeight: 260, objectFit: 'contain' }} />
                ) : (
                  <Typography color="text.secondary">Upload a wildlife image to run prediction</Typography>
                )}
              </Box>

              <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<UploadFile />}
                  sx={{ py: 1.2, fontWeight: 700 }}
                >
                  Choose Image
                  <input hidden accept="image/*" type="file" onChange={handleFileChange} />
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<PlayArrow />}
                  onClick={handleTest}
                  disabled={loading || !selectedFile}
                  sx={{ py: 1.2, fontWeight: 700 }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Run YOLO Inference Test'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={700} color="primary.dark" gutterBottom>
              Inference Bounding Box & Output Json
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {result ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ p: 2, bgcolor: 'success.50', borderRadius: 2, border: '1px solid', borderColor: 'success.light' }}>
                  <Typography variant="subtitle2" textTransform="uppercase" fontWeight={600} color="text.secondary">
                    Detected Animal
                  </Typography>
                  <Typography variant="h4" fontWeight={800} color="primary.dark">
                    {result.animalName}
                  </Typography>
                  <Chip
                    label={`Confidence: ${(result.confidence * 100).toFixed(1)}%`}
                    color="success"
                    sx={{ mt: 1, fontWeight: 700 }}
                  />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Model Engine:</Typography>
                  <Typography variant="body2" fontWeight={600}>{result.modelUsed}</Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Inference Latency:</Typography>
                  <Typography variant="body2" fontWeight={600}>{result.processingTimeMs} ms</Typography>
                </Box>

                <Typography variant="caption" color="text.secondary" fontWeight={600} textTransform="uppercase">
                  Bounding Box (x, y, w, h)
                </Typography>
                <Paper elevation={0} sx={{ p: 1.5, bgcolor: '#111827', color: '#7B68EE', fontFamily: 'monospace', borderRadius: 2, fontSize: 13 }}>
                  {JSON.stringify(result.bbox, null, 2)}
                </Paper>
              </Box>
            ) : (
              <Box sx={{ py: 6, textAlign: 'center' }}>
                <Biotech sx={{ fontSize: 48, color: 'action.active', mb: 1 }} />
                <Typography color="text.secondary">Click "Run YOLO Inference Test" to analyze sample.</Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </DashboardLayout>
  )
}
