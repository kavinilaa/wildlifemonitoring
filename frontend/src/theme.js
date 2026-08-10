import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary:   { main: '#2E7D32', light: '#4CAF50', dark: '#1B5E20', contrastText: '#fff' },
    secondary: { main: '#7B68EE', light: '#9C8FFF', dark: '#5A4FBB', contrastText: '#fff' },
    background:{ default: '#F4F6F4', paper: '#FFFFFF' },
    text:      { primary: '#1A2E1A', secondary: '#4A6741' },
    error:     { main: '#D32F2F' },
    warning:   { main: '#F57C00' },
    success:   { main: '#388E3C' },
    info:      { main: '#7B68EE' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 500 },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600, borderRadius: 8 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' },
      },
    },
    MuiChip: {
      styleOverrides: { root: { fontWeight: 500 } },
    },
  },
})

export default theme
