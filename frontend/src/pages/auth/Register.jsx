import { useState } from 'react'
import {
  Box, Card, CardContent, Typography, TextField, Button,
  FormControl, InputLabel, Select, MenuItem, Alert, CircularProgress,
  Container, Grid, Paper
} from '@mui/material'
import { Park, Badge, CheckCircle } from '@mui/icons-material'
import { useNavigate, Link } from 'react-router-dom'
import { register as registerApi } from '../../services/authService'
import { motion } from 'framer-motion'

export default function Register() {
  const navigate = useNavigate()

  const [role, setRole] = useState('FOREST_OFFICER')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // Role Specific Fields
  const [forestZone, setForestZone] = useState('')
  const [forestRange, setForestRange] = useState('')
  const [stationName, setStationName] = useState('')
  const [organization, setOrganization] = useState('')
  const [department, setDepartment] = useState('')
  const [officeName, setOfficeName] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successResult, setSuccessResult] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccessResult(null)

    if (!fullName || !email || !phone || !password || !confirmPassword) {
      setError('Please fill in all mandatory fields.')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    const payload = {
      role,
      fullName,
      email,
      phone,
      password,
      ...(role === 'FOREST_OFFICER' && { forestZone, forestRange, stationName }),
      ...(role === 'RESEARCHER' && { organization, department }),
      ...(role === 'SYSTEM_ADMIN' && { officeName }),
    }

    setLoading(true)
    try {
      const response = await registerApi(payload)
      setSuccessResult(response)
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please verify form details.')
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
        py: 5,
        px: 2,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(27,94,32,0.85) 0%, rgba(10,30,12,0.92) 100%)',
          backdropFilter: 'blur(4px)',
        },
      }}
    >
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box
              sx={{
                width: 56, height: 56, borderRadius: '50%', bgcolor: 'secondary.main',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 6px 20px rgba(123,104,238,0.5)', mb: 1
              }}
            >
              <Park sx={{ color: '#fff', fontSize: 32 }} />
            </Box>
            <Typography variant="h4" fontWeight={800} sx={{ color: '#fff' }}>
              WildLumina Personnel Registration
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mt: 0.5 }}>
              Register for Forest Guard, Research, or Administration Access
            </Typography>
          </Box>

          <Card
            sx={{
              borderRadius: 3,
              boxShadow: '0 16px 40px rgba(0,0,0,0.35)',
              background: 'rgba(255, 255, 255, 0.96)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <CardContent sx={{ p: 4 }}>
              {successResult ? (
                <Paper elevation={0} sx={{ p: 4, textAlign: 'center', bgcolor: 'success.50', borderRadius: 3, border: '1px solid', borderColor: 'success.light' }}>
                  <CheckCircle sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
                  <Typography variant="h5" fontWeight={700} color="success.dark" gutterBottom>
                    Registration Successful!
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    Your account has been registered with the WildLumina system.
                  </Typography>
                  <Box sx={{ my: 3, p: 2.5, bgcolor: '#fff', borderRadius: 2, display: 'inline-block', border: '2px dashed', borderColor: 'primary.main' }}>
                    <Typography variant="caption" color="text.secondary" textTransform="uppercase" fontWeight={600}>
                      Backend Assigned Login ID
                    </Typography>
                    <Typography variant="h4" fontWeight={800} color="primary.dark" sx={{ letterSpacing: 2 }}>
                      {successResult.loginId}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                      Please record this Login ID. You will use it to log in.
                    </Typography>
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => navigate('/login')}
                      sx={{ px: 4, py: 1.2, fontWeight: 700 }}
                    >
                      Go to Login Page
                    </Button>
                  </Box>
                </Paper>
              ) : (
                <Box component="form" onSubmit={handleSubmit}>
                  {error && (
                    <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                      {error}
                    </Alert>
                  )}

                  <Grid container spacing={2.5}>
                    {/* Role Selection */}
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id="reg-role-label">System Designation / Role</InputLabel>
                        <Select
                          labelId="reg-role-label"
                          value={role}
                          label="System Designation / Role"
                          onChange={(e) => setRole(e.target.value)}
                        >
                          <MenuItem value="FOREST_OFFICER">Forest Officer (Field Monitor)</MenuItem>
                          <MenuItem value="RESEARCHER">Researcher (ML & Ecology)</MenuItem>
                          <MenuItem value="SYSTEM_ADMIN">System Administrator</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    {/* Common Fields */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Dr. Rajesh Kumar"
                        required
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Official Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. officer@forest.gov.in"
                        required
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        required
                      />
                    </Grid>

                    {/* Backend Generated ID Note */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Login ID"
                        value="[ Generated automatically by backend ]"
                        disabled
                        helperText="Backend will assign Login ID upon registration"
                        InputProps={{ startAdornment: <Badge color="action" sx={{ mr: 1 }} /> }}
                      />
                    </Grid>

                    {/* Role Specific Dynamic Fields */}
                    {role === 'FOREST_OFFICER' && (
                      <>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            fullWidth
                            label="Forest Zone"
                            value={forestZone}
                            onChange={(e) => setForestZone(e.target.value)}
                            placeholder="e.g. Western Ghats"
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            fullWidth
                            label="Forest Range"
                            value={forestRange}
                            onChange={(e) => setForestRange(e.target.value)}
                            placeholder="e.g. Mudumalai"
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            fullWidth
                            label="Station Name"
                            value={stationName}
                            onChange={(e) => setStationName(e.target.value)}
                            placeholder="e.g. Theppakadu Post"
                          />
                        </Grid>
                      </>
                    )}

                    {role === 'RESEARCHER' && (
                      <>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Organization / College"
                            value={organization}
                            onChange={(e) => setOrganization(e.target.value)}
                            placeholder="e.g. Wildlife Institute of India"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Department"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            placeholder="e.g. AI & Ecological Biometrics"
                          />
                        </Grid>
                      </>
                    )}

                    {role === 'SYSTEM_ADMIN' && (
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Office Name"
                          value={officeName}
                          onChange={(e) => setOfficeName(e.target.value)}
                          placeholder="e.g. Central Wildlife Headquarters, Delhi"
                        />
                      </Grid>
                    )}

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 1 }}>
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
                          '&:hover': { bgcolor: 'primary.main' }
                        }}
                      >
                        {loading ? <CircularProgress size={26} color="inherit" /> : 'Register & Assign Login ID'}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              )}

              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Already registered?{' '}
                  <Link to="/login" style={{ color: '#2E7D32', fontWeight: 600, textDecoration: 'none' }}>
                    Sign in with Login ID
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
