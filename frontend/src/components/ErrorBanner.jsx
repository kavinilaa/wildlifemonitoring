import { Alert, AlertTitle, Box, Button } from '@mui/material'
import { WifiOff, Refresh } from '@mui/icons-material'

export default function ErrorBanner({ title = 'Offline / Fallback Mode', message, onRetry }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Alert
        severity="info"
        icon={<WifiOff />}
        action={
          onRetry && (
            <Button color="inherit" size="small" startIcon={<Refresh />} onClick={onRetry}>
              Retry Connection
            </Button>
          )
        }
        sx={{ borderRadius: 2 }}
      >
        <AlertTitle sx={{ fontWeight: 700 }}>{title}</AlertTitle>
        {message || 'Spring Boot API is operating in standalone demo mode. Live data and simulated monitoring are active.'}
      </Alert>
    </Box>
  )
}
