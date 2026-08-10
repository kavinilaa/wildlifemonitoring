import { useState, useEffect } from 'react'
import {
  Box, Typography, Grid, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip, Button, TextField,
  FormControl, InputLabel, Select, MenuItem, Dialog, DialogTitle,
  DialogContent, DialogActions, CircularProgress, Alert
} from '@mui/material'
import {
  Add, Search, Refresh, Dashboard as DashIcon, People, Storage,
  Memory, MonitorHeart, Timeline, Assessment, Settings
} from '@mui/icons-material'
import DashboardLayout from '../../layouts/DashboardLayout'
import ErrorBanner from '../../components/ErrorBanner'
import { getUsers, updateUserStatus, createUser } from '../../services/userService'

const adminNavItems = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: <DashIcon fontSize="small" /> },
  { label: 'User Management', path: '/admin/users', icon: <People fontSize="small" /> },
  { label: 'Dataset Management', path: '/admin/datasets', icon: <Storage fontSize="small" /> },
  { label: 'AI Model Management', path: '/admin/models', icon: <Memory fontSize="small" /> },
  { label: 'System Monitoring', path: '/admin/monitoring', icon: <MonitorHeart fontSize="small" /> },
  { label: 'Analytics', path: '/admin/analytics', icon: <Timeline fontSize="small" /> },
  { label: 'Reports', path: '/admin/reports', icon: <Assessment fontSize="small" /> },
  { label: 'Settings', path: '/admin/settings', icon: <Settings fontSize="small" /> },
]

export default function UserManagement() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('ALL')
  const [openModal, setOpenModal] = useState(false)

  // New user form state
  const [newRole, setNewRole] = useState('FOREST_OFFICER')
  const [newName, setNewName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newPass, setNewPass] = useState('')
  const [modalSuccess, setModalSuccess] = useState('')

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const data = await getUsers()
      setUsers(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleToggleStatus = async (user) => {
    const nextStatus = user.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
    await updateUserStatus(user.id, nextStatus)
    fetchUsers()
  }

  const handleCreateUser = async (e) => {
    e.preventDefault()
    setModalSuccess('')
    const created = await createUser({
      role: newRole,
      fullName: newName,
      email: newEmail,
      phone: newPhone,
      password: newPass,
    })
    setModalSuccess(`User created successfully! Login ID: ${created.loginId}`)
    fetchUsers()
    setTimeout(() => {
      setOpenModal(false)
      setModalSuccess('')
      setNewName('')
      setNewEmail('')
      setNewPhone('')
      setNewPass('')
    }, 2000)
  }

  const filteredUsers = users.filter(u => {
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter
    const term = searchTerm.toLowerCase()
    const matchesSearch = !searchTerm || (
      u.fullName?.toLowerCase().includes(term) ||
      u.loginId?.toLowerCase().includes(term) ||
      u.email?.toLowerCase().includes(term)
    )
    return matchesRole && matchesSearch
  })

  return (
    <DashboardLayout sidebarItems={adminNavItems} sidebarTitle="System Admin" pageTitle="User Account Management">
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h5" fontWeight={700} color="primary.dark">
            Personnel Directory & Access Control
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage system roles, Forest Officer assignments, and Researcher access
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button startIcon={<Add />} variant="contained" color="primary" onClick={() => setOpenModal(true)}>
            Add New Personnel
          </Button>
          <Button startIcon={<Refresh />} variant="outlined" size="small" onClick={fetchUsers}>
            Refresh
          </Button>
        </Box>
      </Box>

      <ErrorBanner />

      {/* Filter Bar */}
      <Paper sx={{ p: 2.5, mb: 3, borderRadius: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search name, Login ID, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{ startAdornment: <Search color="action" sx={{ mr: 1 }} /> }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Filter by Role</InputLabel>
              <Select
                value={roleFilter}
                label="Filter by Role"
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <MenuItem value="ALL">All Roles</MenuItem>
                <MenuItem value="SYSTEM_ADMIN">System Administrator</MenuItem>
                <MenuItem value="FOREST_OFFICER">Forest Officer</MenuItem>
                <MenuItem value="RESEARCHER">Researcher</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* User Table */}
      <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: 'primary.main' }}>
              <TableRow>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Login ID</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Full Name</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Role</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Contact Info</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Assignment / Org</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }} align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 5 }}>
                    <CircularProgress color="primary" />
                  </TableCell>
                </TableRow>
              ) : filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">No users found matching search criteria.</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell sx={{ fontWeight: 700, color: 'primary.dark' }}>{user.loginId}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{user.fullName}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.role}
                        color={user.role === 'SYSTEM_ADMIN' ? 'secondary' : user.role === 'RESEARCHER' ? 'info' : 'primary'}
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{user.email}</Typography>
                      <Typography variant="caption" color="text.secondary">{user.phone}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {user.forestRange || user.organization || user.officeName || 'Central HQ'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.status || 'ACTIVE'}
                        color={user.status === 'ACTIVE' ? 'success' : 'error'}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        size="small"
                        variant="outlined"
                        color={user.status === 'ACTIVE' ? 'error' : 'success'}
                        onClick={() => handleToggleStatus(user)}
                      >
                        {user.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add User Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: 'primary.dark', color: '#fff', fontWeight: 700 }}>
          Create New Personnel Account
        </DialogTitle>
        <Box component="form" onSubmit={handleCreateUser}>
          <DialogContent sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {modalSuccess && <Alert severity="success">{modalSuccess}</Alert>}

            <FormControl fullWidth>
              <InputLabel>Designation Role</InputLabel>
              <Select value={newRole} label="Designation Role" onChange={(e) => setNewRole(e.target.value)}>
                <MenuItem value="FOREST_OFFICER">Forest Officer</MenuItem>
                <MenuItem value="RESEARCHER">Researcher</MenuItem>
                <MenuItem value="SYSTEM_ADMIN">System Administrator</MenuItem>
              </Select>
            </FormControl>

            <TextField fullWidth label="Full Name" value={newName} onChange={(e) => setNewName(e.target.value)} required />
            <TextField fullWidth label="Official Email" type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} required />
            <TextField fullWidth label="Phone Number" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} required />
            <TextField fullWidth label="Initial Password" type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} required />

            <Typography variant="caption" color="text.secondary">
              * Note: Backend automatically generates and assigns a unique Login ID (e.g. FO1003, RES1003).
            </Typography>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">Create Personnel Account</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </DashboardLayout>
  )
}
