import { useState } from 'react'
import {
  Box, Card, CardContent, Typography, TextField, Button,
  FormControl, InputLabel, Select, MenuItem, Alert, CircularProgress,
  InputAdornment, IconButton, Container, Chip
} from '@mui/material'
import { Visibility, VisibilityOff, Lock, Person, Park, Shield } from '@mui/icons-material'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { login as loginApi } from '../../services/authService'
import { motion } from 'framer-motion'

export default function Login() {
  const navigate = useNavigate()
  const { login: authLogin } = useAuth()

  const [role, setRole] = useState('FOREST_OFFICER')
  const [loginId, setLoginId] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleRoleChange = (e) => {
    const selected = e.target.value
    setRole(selected)
    if (selected === 'SYSTEM_ADMIN') setLoginId('ADMIN001')
    else if (selected === 'FOREST_OFFICER') setLoginId('FO1001')
    else if (selected === 'RESEARCHER') setLoginId('RES1001')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!loginId.trim()) {
      setError('Please enter your assigned Login ID')
      return
    }
    if (!password) {
      setError('Please enter your password')
      return
    }

    setLoading(true)
    try {
      const userData = await loginApi({ role, loginId, password })
      authLogin(userData)
      if (userData.role === 'SYSTEM_ADMIN') navigate('/admin/dashboard')
      else if (userData.role === 'RESEARCHER') navigate('/researcher/dashboard')
      else navigate('/officer/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Invalid Login ID or Password for the selected role.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url(/assets/images/wildlife_bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        py: 4,
        px: 2,
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(27,94,32,0.85) 0%, rgba(10,30,12,0.92) 100%)',
          backdropFilter: 'blur(4px)',
        },
      }}
    >
      <Container maxWidth="xs" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Header Branding */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box
              sx={{
                width: 64, height: 64, borderRadius: '50%', bgcolor: 'secondary.main',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(123,104,238,0.5)', mb: 1.5
              }}
            >
              <Park sx={{ color: '#fff', fontSize: 36 }} />
            </Box>
            <Typography variant="h4" fontWeight={800} sx={{ color: '#fff', letterSpacing: 0.5 }}>
              WildLumina
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mt: 0.5 }}>
              AI Wildlife Monitoring & Detection System
            </Typography>
          </Box>

          {/* Login Card */}
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: '0 16px 40px rgba(0,0,0,0.35)',
              background: 'rgba(255, 255, 255, 0.96)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ mb: 3, textAlign: 'center' }}>
                <Chip
                  icon={<Shield fontSize="small" />}
                  label="Official Project Portal"
                  color="primary"
                  size="small"
                  sx={{ mb: 1, fontWeight: 600 }}
                />
                <Typography variant="h6" fontWeight={700} color="primary.dark">
                  System Portal Sign In
                </Typography>
              </Box>

              {error && (
                <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }}>
                  {error}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                {/* Role Select */}
                <FormControl fullWidth size="medium">
                  <InputLabel id="role-select-label">Select System Role</InputLabel>
                  <Select
                    labelId="role-select-label"
                    value={role}
                    label="Select System Role"
                    onChange={handleRoleChange}
                  >
                    <MenuItem value="FOREST_OFFICER">Forest Officer</MenuItem>
                    <MenuItem value="RESEARCHER">Researcher</MenuItem>
                    <MenuItem value="SYSTEM_ADMIN">System Administrator</MenuItem>
                  </Select>
                </FormControl>

                {/* Login ID Input */}
                <TextField
                  fullWidth
                  label="Login ID (e.g., FO1001, RES1001, ADMIN001)"
                  variant="outlined"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  placeholder="Enter assigned Login ID"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="action" />
                      </InputAdornment>
                    ),
                  }}
                  helperText="Do not use email address as Login ID"
                />

                {/* Password Input */}
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    py: 1.4,
                    fontSize: '1rem',
                    fontWeight: 700,
                    bgcolor: 'primary.dark',
                    '&:hover': { bgcolor: 'primary.main' },
                    boxShadow: '0 4px 14px rgba(46,125,50,0.4)',
                  }}
                >
                  {loading ? <CircularProgress size={26} color="inherit" /> : 'Log In to System'}
                </Button>
              </Box>

              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  New personnel?{' '}
                  <Link to="/register" style={{ color: '#2E7D32', fontWeight: 600, textDecoration: 'none' }}>
                    Register Official Account
                  </Link>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Box>
  )
}
