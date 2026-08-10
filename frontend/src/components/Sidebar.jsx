import {
  Drawer, List, ListItemButton, ListItemIcon, ListItemText,
  Box, Typography, Divider
} from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Park } from '@mui/icons-material'

export const DRAWER_WIDTH = 260

export default function Sidebar({ items = [], title = 'WildLumina', open, onClose, variant = 'permanent' }) {
  const location = useLocation()
  const navigate = useNavigate()

  const content = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'primary.dark', color: '#fff' }}>
      {/* Brand & Logo */}
      <Box sx={{ px: 2.5, py: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box sx={{
          width: 40, height: 40, borderRadius: 2,
          bgcolor: 'secondary.main', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(123,104,238,0.4)'
        }}>
          <Park sx={{ color: '#fff', fontSize: 24 }} />
        </Box>
        <Box>
          <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: 17, lineHeight: 1.2, letterSpacing: 0.5 }}>
            WildLumina
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>
            {title}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)' }} />

      <List sx={{ flex: 1, px: 1.5, py: 2, overflowY: 'auto' }}>
        {items.map((item) => {
          const active = location.pathname === item.path
          return (
            <motion.div key={item.path} whileHover={{ x: 4 }} transition={{ duration: 0.15 }}>
              <ListItemButton
                onClick={() => { navigate(item.path); onClose && onClose() }}
                sx={{
                  borderRadius: 2, mb: 0.8, py: 1.2, px: 2,
                  bgcolor: active ? 'rgba(255,255,255,0.18)' : 'transparent',
                  borderLeft: active ? '4px solid #7B68EE' : '4px solid transparent',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
                  transition: 'all 0.2s ease',
                }}
              >
                <ListItemIcon sx={{ color: active ? '#fff' : 'rgba(255,255,255,0.7)', minWidth: 38 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: 14, fontWeight: active ? 700 : 500,
                    color: active ? '#fff' : 'rgba(255,255,255,0.85)',
                  }}
                />
              </ListItemButton>
            </motion.div>
          )
        })}
      </List>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)' }} />
      <Box sx={{ px: 2.5, py: 2 }}>
        <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: 10, textAlign: 'center', fontWeight: 500 }}>
          WildLumina v1.0 • Wildlife Monitoring System
        </Typography>
      </Box>
    </Box>
  )

  if (variant === 'temporary') {
    return (
      <Drawer open={open} onClose={onClose} variant="temporary"
        sx={{ '& .MuiDrawer-paper': { width: DRAWER_WIDTH, border: 'none' } }}>
        {content}
      </Drawer>
    )
  }

  return (
    <Drawer variant="permanent" open
      sx={{ width: DRAWER_WIDTH, flexShrink: 0, '& .MuiDrawer-paper': { width: DRAWER_WIDTH, border: 'none', boxSizing: 'border-box' } }}>
      {content}
    </Drawer>
  )
}
