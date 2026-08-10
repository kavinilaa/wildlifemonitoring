import { Card, CardContent, Typography, Box } from '@mui/material'
import { motion } from 'framer-motion'

export default function StatCard({ title, value, icon, color = 'primary.main', subtitle }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card sx={{ height: '100%' }}>
        <CardContent sx={{ p: 2.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontWeight: 500, textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: 0.8 }}>
                {title}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color }}>
                {value ?? '—'}
              </Typography>
              {subtitle && (
                <Typography variant="caption" color="text.secondary">{subtitle}</Typography>
              )}
            </Box>
            {icon && (
              <Box sx={{ bgcolor: `${color}18`, borderRadius: 2, p: 1.2, color }}>
                {icon}
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  )
}
