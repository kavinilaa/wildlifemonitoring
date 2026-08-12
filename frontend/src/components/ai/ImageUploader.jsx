import { useRef } from 'react'
import { Box, Button, Card, Typography, Stack } from '@mui/material'
import { CloudUpload, ImageOutlined } from '@mui/icons-material'

export default function ImageUploader({ onFileSelect, fileName, previewUrl }) {
  const inputRef = useRef(null)

  const handleDrop = (event) => {
    event.preventDefault()
    const file = event.dataTransfer.files?.[0]
    if (file) onFileSelect(file)
  }

  return (
    <Card
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      sx={{
        border: '2px dashed',
        borderColor: 'primary.main',
        background: 'linear-gradient(135deg, rgba(46,125,50,0.04), rgba(123,104,238,0.06))',
        p: 3,
        borderRadius: 4,
        textAlign: 'center',
        transition: 'all 0.2s ease',
        minHeight: 280,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <input
        ref={inputRef}
        type="file"
        hidden
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={(e) => e.target.files?.[0] && onFileSelect(e.target.files[0])}
      />

      <Stack spacing={2} alignItems="center" sx={{ width: '100%' }}>
        <Box sx={{ width: 72, height: 72, borderRadius: '50%', bgcolor: 'rgba(46,125,50,0.12)', display: 'grid', placeItems: 'center' }}>
          <CloudUpload sx={{ fontSize: 38, color: 'primary.main' }} />
        </Box>

        <Typography variant="h6" fontWeight={700} color="primary.dark">
          Upload Wildlife Image
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Drag & drop an image here
        </Typography>

        <Button variant="contained" startIcon={<ImageOutlined />} onClick={() => inputRef.current?.click()}>
          Browse Image
        </Button>

        <Typography variant="caption" color="text.secondary">
          Supported: JPG, JPEG, PNG, WEBP • Max 10 MB
        </Typography>

        {previewUrl && fileName && (
          <Typography variant="caption" color="success.main" fontWeight={700}>
            Selected: {fileName}
          </Typography>
        )}
      </Stack>
    </Card>
  )
}
