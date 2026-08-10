import {
  AppBar, Toolbar, IconButton, Typography, Box, Avatar,
  Menu, MenuItem, Tooltip, Chip
} from '@mui/material'
import { Menu as MenuIcon, Logout, AccountCircle } from '@mui/icons-material'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { DRAWER_WIDTH } from './Sidebar'

const roleLabel = {
  SYSTEM_ADMIN:   'System Admin',
  FOREST_OFFICER: 'Forest Officer',
  RESEARCHER:     'Researcher',
}

export default function Navbar({ onMenuClick, pageTitle }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [anchor, setAnchor] = useState(null)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
        ml: { md: `${DRAWER_WIDTH}px` },
        bgcolor: '#fff',
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary',
      }}
    >
      <Toolbar sx={{ gap: 1 }}>
        <IconButton edge="start" onClick={onMenuClick} sx={{ display: { md: 'none' } }}>
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{ flex: 1, fontWeight: 600, color: 'primary.dark' }}>
          {pageTitle || 'WildLumina'}
        </Typography>

        <Chip
          label={roleLabel[user?.role] || user?.role}
          color="primary"
          size="small"
          variant="outlined"
          sx={{ mr: 1 }}
        />

        <Tooltip title="Account">
          <IconButton onClick={(e) => setAnchor(e.currentTarget)} size="small">
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: 14 }}>
              {user?.fullName?.[0] || user?.loginId?.[0] || 'U'}
            </Avatar>
          </IconButton>
        </Tooltip>

        <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}>
          <MenuItem disabled>
            <Box>
              <Typography variant="body2" fontWeight={600}>{user?.fullName || user?.loginId}</Typography>
              <Typography variant="caption" color="text.secondary">{user?.loginId}</Typography>
            </Box>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <Logout fontSize="small" sx={{ mr: 1 }} /> Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}
