import { Box, Toolbar, useMediaQuery, useTheme } from '@mui/material'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar, { DRAWER_WIDTH } from '../components/Sidebar'

export default function DashboardLayout({ children, sidebarItems, sidebarTitle, pageTitle }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Desktop sidebar */}
      {!isMobile && (
        <Sidebar items={sidebarItems} title={sidebarTitle} variant="permanent" />
      )}

      {/* Mobile drawer */}
      {isMobile && (
        <Sidebar
          items={sidebarItems}
          title={sidebarTitle}
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />
      )}

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Navbar onMenuClick={() => setMobileOpen(true)} pageTitle={pageTitle} />
        <Toolbar />
        <Box component="main" sx={{ flex: 1, p: { xs: 2, sm: 3 } }}>
          {children}
        </Box>
      </Box>
    </Box>
  )
}
