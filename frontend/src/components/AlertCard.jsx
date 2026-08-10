import { Card, CardContent, Typography, Box, Chip, Button, Stack } from '@mui/material'
import { NotificationsActive, Warning, Info } from '@mui/icons-material'

const severityConfig = {
  HIGH:   { color: 'error',   icon: <Warning fontSize="small" /> },
  MEDIUM: { color: 'warning', icon: <NotificationsActive fontSize="small" /> },
  LOW:    { color: 'info',    icon: <Info fontSize="small" /> },
}

const statusColor = { ACTIVE: 'error', ACKNOWLEDGED: 'warning', RESOLVED: 'success' }

export default function AlertCard({ alert, onAcknowledge, onResolve }) {
  const { alertType, species, severity, confidence, createdAt, status } = alert || {}
  const sev = severityConfig[severity] || severityConfig.LOW

  return (
    <Card sx={{ borderLeft: 4, borderColor: `${sev.color}.main` }}>
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ color: `${sev.color}.main` }}>{sev.icon}</Box>
            <Typography variant="subtitle1" fontWeight={600}>{alertType || 'Alert'}</Typography>
          </Box>
          <Chip label={status || 'ACTIVE'} color={statusColor[status] || 'error'} size="small" />
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          Species: <strong>{species || '—'}</strong>
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          Severity: <Chip label={severity || '—'} color={sev.color} size="small" sx={{ ml: 0.5 }} />
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          Confidence: <strong>{confidence != null ? `${(confidence * 100).toFixed(1)}%` : '—'}</strong>
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {createdAt ? new Date(createdAt).toLocaleString() : '—'}
        </Typography>

        {status === 'ACTIVE' && (
          <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
            <Button size="small" variant="outlined" color="warning" onClick={() => onAcknowledge && onAcknowledge(alert)}>
              Acknowledge
            </Button>
            <Button size="small" variant="outlined" color="success" onClick={() => onResolve && onResolve(alert)}>
              Resolve
            </Button>
          </Stack>
        )}
        {status === 'ACKNOWLEDGED' && (
          <Button size="small" variant="outlined" color="success" sx={{ mt: 1.5 }} onClick={() => onResolve && onResolve(alert)}>
            Resolve
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
