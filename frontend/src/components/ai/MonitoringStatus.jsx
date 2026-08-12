import { Box, Card, CardContent, Chip, Grid, Stack, Typography } from '@mui/material'

export default function MonitoringStatus() {
  return (
    <Card sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', boxShadow: 1 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={700} color="primary.dark" gutterBottom>
          Automatic Folder Monitoring
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'success.main', mt: 0.7 }} />
          <Typography variant="body2" fontWeight={700} color="success.main">Monitoring Active</Typography>
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          New images placed in the monitored folder will automatically enter the AI detection pipeline.
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(46,125,50,0.06)' }}>
              <Typography variant="caption" color="text.secondary">Folder Status</Typography>
              <Typography variant="h6" fontWeight={800} color="success.main">ACTIVE</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(123,104,238,0.06)' }}>
              <Typography variant="caption" color="text.secondary">Images Waiting</Typography>
              <Typography variant="h6" fontWeight={800} color="primary.dark">3</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(21,101,192,0.06)' }}>
              <Typography variant="caption" color="text.secondary">Images Processed Today</Typography>
              <Typography variant="h6" fontWeight={800} color="primary.dark">24</Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
