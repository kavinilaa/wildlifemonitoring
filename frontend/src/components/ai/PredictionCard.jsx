import { Box, Card, CardContent, Chip, Divider, Stack, Typography } from '@mui/material'

const getConfidenceColor = (confidence) => {
  if (confidence >= 90) return 'success'
  if (confidence >= 70) return 'warning'
  return 'error'
}

export default function PredictionCard({ result }) {
  if (!result) return null

  const confidence = Number(result.confidence || 0)

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, border: '1px solid', borderColor: 'divider' }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="overline" color="text.secondary" fontWeight={700} letterSpacing={1.5}>
          AI DETECTION RESULT
        </Typography>

        <Stack spacing={2.5} sx={{ mt: 2 }}>
          <Box>
            <Typography variant="caption" color="text.secondary" textTransform="uppercase" fontWeight={700}>Detected Species</Typography>
            <Typography variant="h4" fontWeight={800} color="primary.dark">{result.species}</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
            <Typography variant="body2" fontWeight={700} color="text.secondary">Confidence</Typography>
            <Chip
              label={`${confidence.toFixed(1)}%`}
              color={getConfidenceColor(confidence)}
              sx={{ fontWeight: 800 }}
            />
          </Box>

          <Divider />

          <Stack spacing={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Detection Status</Typography>
              <Typography variant="body2" fontWeight={700}>{result.status || 'Detected'}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Processing Time</Typography>
              <Typography variant="body2" fontWeight={700}>{result.processingTime || 0} sec</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Model</Typography>
              <Typography variant="body2" fontWeight={700}>{result.model || 'YOLOv8'}</Typography>
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
