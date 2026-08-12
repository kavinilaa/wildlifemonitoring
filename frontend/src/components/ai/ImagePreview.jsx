import { Box, Button, Card, CardContent, Divider, Stack, Typography } from '@mui/material'
import { DeleteOutline, Replay } from '@mui/icons-material'

export default function ImagePreview({ file, previewUrl, onRemove, onChange }) {
  if (!file || !previewUrl) return null

  return (
    <Card sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: 2 }}>
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle1" fontWeight={700}>Selected Image</Typography>
          <Button size="small" variant="outlined" startIcon={<Replay />} onClick={onChange}>
            Change Image
          </Button>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Box component="img" src={previewUrl} alt={file.name} sx={{ maxHeight: 260, maxWidth: '100%', borderRadius: 2, objectFit: 'contain', bgcolor: '#f5f5f5' }} />
        </Box>

        <Divider sx={{ my: 1.5 }} />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} justifyContent="space-between">
          <Box>
            <Typography variant="caption" color="text.secondary">Filename</Typography>
            <Typography variant="body2" fontWeight={600}>{file.name}</Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">File Size</Typography>
            <Typography variant="body2" fontWeight={600}>{(file.size / (1024 * 1024)).toFixed(2)} MB</Typography>
          </Box>
        </Stack>

        <Button color="error" variant="text" startIcon={<DeleteOutline />} onClick={onRemove} sx={{ mt: 2 }}>
          Remove Image
        </Button>
      </CardContent>
    </Card>
  )
}
