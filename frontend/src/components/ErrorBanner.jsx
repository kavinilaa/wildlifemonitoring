import { Alert, AlertTitle, Box, Button } from '@mui/material'
import { WifiOff, Refresh } from '@mui/icons-material'

export default function ErrorBanner({ title = '', message = '', onRetry }) {
  if (!title && !message) return null

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
        <AlertTitle sx={{ fontWeight: 700 }}>{title || 'Connection issue'}</AlertTitle>
        {message || 'Unable to load data from the backend.'}
      </Alert>
    </Box>
  )
}
