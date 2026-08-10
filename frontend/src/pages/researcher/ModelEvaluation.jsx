import { Box, Typography, Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Divider } from '@mui/material'
import {
  Assessment, Dashboard as DashIcon, Storage, ModelTraining as TrainIcon,
  Biotech, Timeline, Description, Settings
} from '@mui/icons-material'
import DashboardLayout from '../../layouts/DashboardLayout'

const researcherNavItems = [
  { label: 'Dashboard', path: '/researcher/dashboard', icon: <DashIcon fontSize="small" /> },
  { label: 'Dataset Management', path: '/researcher/datasets', icon: <Storage fontSize="small" /> },
  { label: 'Model Training', path: '/researcher/training', icon: <TrainIcon fontSize="small" /> },
  { label: 'Model Evaluation', path: '/researcher/evaluation', icon: <Assessment fontSize="small" /> },
  { label: 'Prediction Testing', path: '/researcher/testing', icon: <Biotech fontSize="small" /> },
  { label: 'Research Analytics', path: '/researcher/analytics', icon: <Timeline fontSize="small" /> },
  { label: 'Reports', path: '/researcher/reports', icon: <Description fontSize="small" /> },
  { label: 'Settings', path: '/researcher/settings', icon: <Settings fontSize="small" /> },
]

const perClassData = [
  { class: 'Bengal Tiger', samples: 1200, precision: 0.965, recall: 0.942, map50: 0.971 },
  { class: 'Asian Elephant', samples: 3400, precision: 0.972, recall: 0.955, map50: 0.980 },
  { class: 'Indian Leopard', samples: 950, precision: 0.912, recall: 0.885, map50: 0.924 },
  { class: 'Spotted Deer', samples: 8200, precision: 0.981, recall: 0.974, map50: 0.989 },
  { class: 'Indian Gaur', samples: 2900, precision: 0.945, recall: 0.930, map50: 0.956 },
  { class: 'Sloth Bear', samples: 610, precision: 0.890, recall: 0.840, map50: 0.885 },
]

export default function ResearcherModelEvaluation() {
  return (
    <DashboardLayout sidebarItems={researcherNavItems} sidebarTitle="Researcher" pageTitle="Model Evaluation Metrics & Confusion Breakdown">
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} color="primary.dark">
          Per-Species Evaluation & Precision Metrics
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Detailed precision, recall, and mean Average Precision breakdown across 12 wildlife classes
        </Typography>
      </Box>

      <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: 'primary.main' }}>
              <TableRow>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Species Class</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Test Samples</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Precision (P)</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Recall (R)</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>mAP@0.5</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {perClassData.map((row) => (
                <TableRow key={row.class} hover>
                  <TableCell sx={{ fontWeight: 700 }}>{row.class}</TableCell>
                  <TableCell>{row.samples.toLocaleString()}</TableCell>
                  <TableCell>{(row.precision * 100).toFixed(1)}%</TableCell>
                  <TableCell>{(row.recall * 100).toFixed(1)}%</TableCell>
                  <TableCell>
                    <Chip label={`${(row.map50 * 100).toFixed(1)}%`} color="success" size="small" sx={{ fontWeight: 700 }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </DashboardLayout>
  )
}
