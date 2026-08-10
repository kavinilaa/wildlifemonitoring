import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TableSortLabel, Paper, Chip, IconButton, Tooltip, Box, Typography,
  TablePagination
} from '@mui/material'
import { Visibility } from '@mui/icons-material'
import { useState } from 'react'

const confidenceColor = (c) => c >= 0.85 ? 'success' : c >= 0.65 ? 'warning' : 'error'

const statusColor = { CONFIRMED: 'success', PENDING: 'warning', FALSE_POSITIVE: 'error' }

export default function DetectionTable({ rows = [], onView }) {
  const [order, setOrder] = useState('desc')
  const [orderBy, setOrderBy] = useState('detectionTime')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleSort = (col) => {
    setOrder(orderBy === col && order === 'asc' ? 'desc' : 'asc')
    setOrderBy(col)
  }

  const sorted = [...rows].sort((a, b) => {
    const av = a[orderBy], bv = b[orderBy]
    if (av == null) return 1
    if (bv == null) return -1
    return order === 'asc' ? (av < bv ? -1 : 1) : (av > bv ? -1 : 1)
  })

  const paginated = sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const cols = [
    { id: 'imageUrl', label: 'Image', sortable: false },
    { id: 'animalName', label: 'Animal', sortable: true },
    { id: 'confidence', label: 'Confidence', sortable: true },
    { id: 'detectionTime', label: 'Date / Time', sortable: true },
    { id: 'location', label: 'Location', sortable: false },
    { id: 'status', label: 'Status', sortable: true },
    { id: 'actions', label: '', sortable: false },
  ]

  return (
    <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <TableContainer>
        <Table size="small">
          <TableHead sx={{ bgcolor: 'primary.main' }}>
            <TableRow>
              {cols.map((col) => (
                <TableCell key={col.id} sx={{ color: '#fff', fontWeight: 600, py: 1.5 }}>
                  {col.sortable ? (
                    <TableSortLabel
                      active={orderBy === col.id}
                      direction={orderBy === col.id ? order : 'asc'}
                      onClick={() => handleSort(col.id)}
                      sx={{ color: '#fff !important', '& .MuiTableSortLabel-icon': { color: '#fff !important' } }}
                    >
                      {col.label}
                    </TableSortLabel>
                  ) : col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">No detections found</Typography>
                </TableCell>
              </TableRow>
            ) : paginated.map((row, i) => (
              <TableRow key={row.id || i} hover>
                <TableCell>
                  {row.imageUrl
                    ? <Box component="img" src={row.imageUrl} alt="" sx={{ width: 56, height: 40, objectFit: 'cover', borderRadius: 1 }} />
                    : <Box sx={{ width: 56, height: 40, bgcolor: 'grey.200', borderRadius: 1 }} />}
                </TableCell>
                <TableCell sx={{ fontWeight: 500 }}>{row.animalName || '—'}</TableCell>
                <TableCell>
                  <Chip
                    label={`${((row.confidence || 0) * 100).toFixed(1)}%`}
                    color={confidenceColor(row.confidence)}
                    size="small"
                  />
                </TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                  {row.detectionTime ? new Date(row.detectionTime).toLocaleString() : '—'}
                </TableCell>
                <TableCell>{row.location || '—'}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status || 'PENDING'}
                    color={statusColor[row.status] || 'default'}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Tooltip title="View Details">
                    <IconButton size="small" color="primary" onClick={() => onView && onView(row)}>
                      <Visibility fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={rows.length}
        page={page}
        onPageChange={(_, p) => setPage(p)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => { setRowsPerPage(+e.target.value); setPage(0) }}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Paper>
  )
}
