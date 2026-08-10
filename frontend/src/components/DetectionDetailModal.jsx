import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  Typography, Box, Chip, Grid, Divider, IconButton, Paper
} from '@mui/material'
import { Close, LocationOn, AccessTime, Security, Category } from '@mui/icons-material'

const confidenceColor = (c) => c >= 0.85 ? 'success' : c >= 0.65 ? 'warning' : 'error'

export default function DetectionDetailModal({ open, onClose, detection }) {
  if (!detection) return null

  const {
    animalName, confidence, detectionTime, location, status,
    imageUrl, bbox, speciesCategory, conservationStatus, sensorId, id
  } = detection

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'primary.dark', color: '#fff', py: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h6" fontWeight={700}>Wildlife Detection #{id}</Typography>
          <Chip label={animalName || 'Unknown'} color="secondary" size="small" sx={{ color: '#fff', fontWeight: 600 }} />
        </Box>
        <IconButton onClick={onClose} sx={{ color: '#fff' }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Grid container spacing={3} sx={{ mt: 0.5 }}>
          {/* Image & Bounding Box Overlay */}
          <Grid item xs={12} md={7}>
            <Paper elevation={3} sx={{ position: 'relative', overflow: 'hidden', borderRadius: 2, bgcolor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
              {imageUrl ? (
                <Box sx={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <Box component="img" src={imageUrl} alt={animalName} sx={{ maxWidth: '100%', maxHeight: 360, objectFit: 'contain' }} />
                  {/* Bounding box simulation visualization */}
                  {bbox && (
                    <Box
                      sx={{
                        position: 'absolute',
                        left: `${(bbox.x / 500) * 100}%`,
                        top: `${(bbox.y / 350) * 100}%`,
                        width: `${(bbox.width / 500) * 100}%`,
                        height: `${(bbox.height / 350) * 100}%`,
                        border: '3px solid #7B68EE',
                        boxShadow: '0 0 10px rgba(123, 104, 238, 0.8)',
                        borderRadius: '4px',
                        pointerEvents: 'none',
                      }}
                    >
                      <Chip
                        label={`${animalName} ${(confidence * 100).toFixed(1)}%`}
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: -24,
                          left: 0,
                          bgcolor: '#7B68EE',
                          color: '#fff',
                          fontWeight: 700,
                          fontSize: '0.7rem',
                          height: 22,
                        }}
                      />
                    </Box>
                  )}
                </Box>
              ) : (
                <Typography color="grey.500">No Image Available</Typography>
              )}
            </Paper>
          </Grid>

          {/* Details Column */}
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="caption" color="text.secondary" textTransform="uppercase" fontWeight={600}>
                  Detected Species
                </Typography>
                <Typography variant="h5" fontWeight={700} color="primary.dark">
                  {animalName || 'Unknown Animal'}
                </Typography>
              </Box>

              <Divider />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">AI Confidence</Typography>
                <Chip
                  label={`${((confidence || 0) * 100).toFixed(1)}%`}
                  color={confidenceColor(confidence)}
                  sx={{ fontWeight: 700 }}
                />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccessTime color="action" fontSize="small" />
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block">Detection Timestamp</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {detectionTime ? new Date(detectionTime).toLocaleString() : '—'}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn color="action" fontSize="small" />
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block">Location / Range</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {location || 'Unspecified Location'}
                  </Typography>
                </Box>
              </Box>

              {sensorId && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Security color="action" fontSize="small" />
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">Sensor / Camera ID</Typography>
                    <Typography variant="body2" fontWeight={600}>{sensorId}</Typography>
                  </Box>
                </Box>
              )}

              {speciesCategory && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Category color="action" fontSize="small" />
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">Species Category</Typography>
                    <Typography variant="body2" fontWeight={600}>{speciesCategory} ({conservationStatus || 'Protected'})</Typography>
                  </Box>
                </Box>
              )}

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                <Typography variant="body2" color="text.secondary">Verification Status</Typography>
                <Chip
                  label={status || 'PENDING'}
                  color={status === 'CONFIRMED' ? 'success' : status === 'FALSE_POSITIVE' ? 'error' : 'warning'}
                  variant="outlined"
                  size="small"
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="contained" color="primary">
          Close Details
        </Button>
      </DialogActions>
    </Dialog>
  )
}
