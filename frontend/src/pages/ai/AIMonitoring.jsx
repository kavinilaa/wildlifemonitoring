import { useMemo, useRef, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import {
  Analytics,
  CloudUpload,
  Download,
  ImageOutlined,
  Save,
  Search,
  Visibility,
} from '@mui/icons-material'
import DashboardLayout from '../../layouts/DashboardLayout'
import ImageUploader from '../../components/ai/ImageUploader'
import ImagePreview from '../../components/ai/ImagePreview'
import PredictionCard from '../../components/ai/PredictionCard'
import MonitoringStatus from '../../components/ai/MonitoringStatus'
import { getMockPredictionHistory, predictImage, savePrediction } from '../../services/aiService'

const navItems = [
  { label: 'AI Monitoring', path: '/ai-monitoring', icon: <Analytics fontSize="small" /> },
  { label: 'Dashboard', path: '/officer/dashboard', icon: <Visibility fontSize="small" /> },
  { label: 'Detection History', path: '/officer/history', icon: <Search fontSize="small" /> },
]

const mockHistory = getMockPredictionHistory()

export default function AIMonitoringPage() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [result, setResult] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [history] = useState(mockHistory)
  const [saveStatus, setSaveStatus] = useState(null) // null | 'saving' | 'saved' | 'error'

  const fileInputRef = useRef(null)

  const onFileSelect = (file) => {
    if (!file) return

    if (file.size > 10 * 1024 * 1024) return

    setSelectedFile(file)
    setPreviewUrl(URL.createObjectURL(file))
    setResult(null)
  }

  const handleAnalyze = async () => {
    if (!selectedFile) return

    setIsAnalyzing(true)

    setTimeout(async () => {
      const prediction = await predictImage(selectedFile)
      setResult(prediction)
      setIsAnalyzing(false)
    }, 1800)
  }

  const resultImage = useMemo(() => {
    if (previewUrl) return previewUrl
    return ''
  }, [previewUrl])

  const handleSaveResult = async () => {
    if (!result || !selectedFile) return
    setSaveStatus('saving')
    try {
      await savePrediction(selectedFile)
      setSaveStatus('saved')
    } catch {
      setSaveStatus('error')
    }
  }

  const handleDownloadResult = () => {
    if (!result) return
    const payload = JSON.stringify(result, null, 2)
    const blob = new Blob([payload], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `wildlumina-result-${Date.now()}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleReset = () => {
    setSelectedFile(null)
    setPreviewUrl('')
    setResult(null)
    setSaveStatus(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <DashboardLayout sidebarItems={navItems} sidebarTitle="WildLumina" pageTitle="AI Wildlife Detection">
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={800} color="primary.dark">
          AI Wildlife Detection
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
          Upload a wildlife image and let WildLumina automatically identify the detected species.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          {!selectedFile && <ImageUploader onFileSelect={onFileSelect} />}

          {selectedFile && previewUrl && (
            <ImagePreview
              file={selectedFile}
              previewUrl={previewUrl}
              onRemove={handleReset}
              onChange={() => {
                if (fileInputRef.current) fileInputRef.current.click()
              }}
            />
          )}

          {selectedFile && !result && !isAnalyzing && (
            <Box sx={{ mt: 2 }}>
              <Button variant="contained" color="primary" fullWidth size="large" startIcon={<Search />} onClick={handleAnalyze}>
                Analyze Image
              </Button>
            </Box>
          )}

          {isAnalyzing && (
            <Card sx={{ mt: 3, borderRadius: 3, boxShadow: 2 }}>
              <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <CircularProgress size={44} sx={{ mb: 2 }} />
                <Typography variant="h6" fontWeight={700} color="primary.dark">
                  Analyzing Wildlife Image...
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Preprocessing Image
                </Typography>
                <Typography variant="caption" color="text.secondary">↓</Typography>
                <Typography variant="body2" color="text.secondary">AI Model Processing</Typography>
                <Typography variant="caption" color="text.secondary">↓</Typography>
                <Typography variant="body2" color="text.secondary">Species Detection</Typography>
                <Typography variant="caption" color="text.secondary">↓</Typography>
                <Typography variant="body2" color="text.secondary">Generating Prediction</Typography>
              </CardContent>
            </Card>
          )}
        </Grid>

        <Grid item xs={12} lg={6}>
          <MonitoringStatus />
        </Grid>
      </Grid>

      {result && (
        <Box sx={{ mt: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={5}>
              <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="h6" fontWeight={700} color="primary.dark" gutterBottom>
                    Original Image
                  </Typography>
                  <Box sx={{ borderRadius: 2, overflow: 'hidden', bgcolor: '#f5f5f5', minHeight: 260, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {resultImage ? (
                      <Box component="img" src={resultImage} alt="Original preview" sx={{ maxWidth: '100%', maxHeight: 320, objectFit: 'contain' }} />
                    ) : (
                      <Typography color="text.secondary">No image available</Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={7}>
              <PredictionCard result={result} />
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid item xs={12}>
              <Card sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', boxShadow: 1 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight={700} color="primary.dark" gutterBottom>
                    Prediction Details
                  </Typography>
                  <Divider sx={{ mb: 2 }} />

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}><Typography variant="body2" color="text.secondary">Species</Typography><Typography variant="body1" fontWeight={700}>{result.species}</Typography></Grid>
                    <Grid item xs={12} sm={6} md={3}><Typography variant="body2" color="text.secondary">Confidence</Typography><Typography variant="body1" fontWeight={700}>{Number(result.confidence || 0).toFixed(1)}%</Typography></Grid>
                    <Grid item xs={12} sm={6} md={3}><Typography variant="body2" color="text.secondary">Detection timestamp</Typography><Typography variant="body1" fontWeight={700}>{new Date(result.detectedAt || Date.now()).toLocaleString()}</Typography></Grid>
                    <Grid item xs={12} sm={6} md={3}><Typography variant="body2" color="text.secondary">Image filename</Typography><Typography variant="body1" fontWeight={700}>{selectedFile?.name || result.imageName || 'uploaded-image'}</Typography></Grid>
                    <Grid item xs={12} sm={6} md={3}><Typography variant="body2" color="text.secondary">Processing time</Typography><Typography variant="body1" fontWeight={700}>{result.processingTime || 0} sec</Typography></Grid>
                    <Grid item xs={12} sm={6} md={3}><Typography variant="body2" color="text.secondary">Model used</Typography><Typography variant="body1" fontWeight={700}>{result.model || 'YOLOv8'}</Typography></Grid>
                    <Grid item xs={12} sm={6} md={3}><Typography variant="body2" color="text.secondary">Detection status</Typography><Typography variant="body1" fontWeight={700}>{result.status || 'Detected'}</Typography></Grid>
                  </Grid>

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 3 }}>
                    <Button
                      variant="contained"
                      color={saveStatus === 'saved' ? 'success' : saveStatus === 'error' ? 'error' : 'primary'}
                      startIcon={<Save />}
                      onClick={handleSaveResult}
                      disabled={saveStatus === 'saving' || saveStatus === 'saved'}
                    >
                      {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved' : saveStatus === 'error' ? 'Save Failed' : 'Save Result'}
                    </Button>
                    <Button variant="outlined" startIcon={<Download />} onClick={handleDownloadResult}>
                      Download Result
                    </Button>
                    <Button variant="text" onClick={handleReset}>
                      Analyze Another Image
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}

      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" fontWeight={800} color="primary.dark" gutterBottom>
          Recent AI Predictions
        </Typography>
        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Species</TableCell>
                <TableCell>Confidence</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.imageName}</TableCell>
                  <TableCell>{row.species}</TableCell>
                  <TableCell>{row.confidence}%</TableCell>
                  <TableCell>{row.time}</TableCell>
                  <TableCell>{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </DashboardLayout>
  )
}
