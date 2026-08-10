import { Card, CardContent, CardMedia, Typography, Box, Chip } from '@mui/material'
import { motion } from 'framer-motion'

const confidenceColor = (conf) => {
  if (conf >= 0.85) return 'success'
  if (conf >= 0.65) return 'warning'
  return 'error'
}

export default function DetectionCard({ detection, onClick }) {
  const { animalName, confidence, detectionTime, location, imageUrl } = detection || {}
  return (
    <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
      <Card sx={{ cursor: 'pointer', height: '100%' }} onClick={onClick}>
        {imageUrl && (
          <CardMedia component="img" height="160" image={imageUrl} alt={animalName} sx={{ objectFit: 'cover' }} />
        )}
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle1" fontWeight={600}>{animalName || 'Unknown'}</Typography>
            <Chip label={`${((confidence || 0) * 100).toFixed(1)}%`} color={confidenceColor(confidence)} size="small" />
          </Box>
          <Typography variant="caption" color="text.secondary" display="block">
            {detectionTime ? new Date(detectionTime).toLocaleString() : '—'}
          </Typography>
          {location && <Typography variant="caption" color="text.secondary">{location}</Typography>}
        </CardContent>
      </Card>
    </motion.div>
  )
}
