import { Box, Chip, Typography, Tooltip } from '@mui/material'
import { CheckCircle, Error, RadioButtonChecked } from '@mui/icons-material'

export default function StatusIndicator({ label, status, activeText = 'ACTIVE', inactiveText = 'INACTIVE' }) {
  const isActive = status === 'ACTIVE' || status === 'LOADED' || status === true
  const displayLabel = status === 'LOADED' ? 'LOADED' : status === 'NOT LOADED' ? 'NOT LOADED' : isActive ? activeText : inactiveText

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {label && <Typography variant="body2" color="text.secondary" fontWeight={500}>{label}:</Typography>}
      <Tooltip title={`System status is currently ${displayLabel}`}>
        <Chip
          icon={isActive ? <RadioButtonChecked fontSize="small" sx={{ animation: 'pulse 2s infinite' }} /> : <Error fontSize="small" />}
          label={displayLabel}
          color={isActive ? 'success' : 'error'}
          size="small"
          sx={{
            fontWeight: 700,
            letterSpacing: 0.5,
            px: 0.5,
            '@keyframes pulse': {
              '0%': { opacity: 1 },
              '50%': { opacity: 0.4 },
              '100%': { opacity: 1 },
            },
          }}
        />
      </Tooltip>
    </Box>
  )
}
