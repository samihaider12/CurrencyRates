import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Typography, TableFooter, Box
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

interface Column {
  id: string;
  label: string;
  align?: 'right' | 'left' | 'center';
}

interface ReusableTableProps {
  title: string;
  columns: Column[];
  rows: any[];
  toUnit: string;
}

const ReusableTable: React.FC<ReusableTableProps> = ({ title, columns, rows }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const totalRealAmount = rows.reduce((sum, row) => sum + (parseFloat(row.realAmount) || 0), 0);
  const totalRealRate = rows.reduce((sum, row) => sum + (parseFloat(row.rate) || 0), 0);
  const totalConvertedAmount = rows.reduce((sum, row) => sum + (parseFloat(row.amount) || 0), 0);

  const fromCurrency = rows[0]?.fromCurrency || '';
  const toCurrency = rows[0]?.toCurrency || '';

  return (
    <TableContainer
      component={Paper}
      sx={{
        mb: 4,
        borderRadius: 2,
        boxShadow: 3,
        width: '100%',
        overflowX: 'auto', // Mobile scroll enabled
        '&::-webkit-scrollbar': { height: '8px' }, // Custom scrollbar style
        '&::-webkit-scrollbar-thumb': { backgroundColor: '#ccc', borderRadius: '4px' }
      }}
    >
      <Box
        sx={{
    p: 2,
    color: 'black',
    display: 'flex',
    gap: 1,
    justifyContent: 'space-between',
    alignItems: { xs: 'flex-start', sm: 'center' },
    width: '100%', 
    minWidth: 'fit-content', // Ye sabse important hai scroll ke liye
    boxSizing: 'border-box'
  }}
      >
        <Typography sx={{ fontSize: "18px", fontWeight: 500 }}>{title}</Typography>
        
      </Box>

      <Table size={isMobile ? 'small' : 'medium'} sx={{ minWidth: 700 }}>
        <TableHead sx={{ bgcolor: '#f5f5f5' }}>
          <TableRow>
            {columns.map((col) => (
              <TableCell 
                key={col.id} 
                align={col.align} 
                sx={{ fontWeight: 500, fontSize:"16px", whiteSpace: 'nowrap' }}
              >
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index} hover>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.userId || `TRX-${index + 1}`}</TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.name}</TableCell>
              <TableCell align="center">
                <Box sx={{ bgcolor: '#e3f2fd', px: 1, py: 0.5, borderRadius: 1, display: 'inline-block', whiteSpace: 'nowrap' }}>
                  {parseFloat(row.realAmount).toFixed(2)} {row.fromCurrency}
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box sx={{ bgcolor: '#e8f5e9', px: 1, py: 0.5, borderRadius: 1, display: 'inline-block', whiteSpace: 'nowrap' }}>
                  {parseFloat(row.rate).toFixed(2)} {row.toCurrency}
                </Box>
              </TableCell>
              <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>{row.date}</TableCell>
              <TableCell align="right" sx={{ fontWeight: 400, color: '#2e7d32', whiteSpace: 'nowrap' }}>
                {parseFloat(row.amount).toFixed(2)} {row.toCurrency}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter sx={{ bgcolor: '#fafafa' }}>
          <TableRow>
            <TableCell colSpan={2} align="center" sx={{ fontWeight: 'bold' }}></TableCell>
            <TableCell align="center" sx={{ color: '#01579b', fontWeight:  400, fontSize:"15px" }}>
              {totalRealAmount.toFixed(2)} {fromCurrency}
            </TableCell>
            <TableCell align="center" sx={{ color: '#2e7d32', fontWeight:  400, fontSize:"15px" }}>
              {totalRealRate.toFixed(2)} {toCurrency}
            </TableCell>
            <TableCell />
            <TableCell align="right" sx={{ color: '#1b5e20', fontWeight:  400, fontSize:"15px" }}>
              {totalConvertedAmount.toFixed(2)} {toCurrency}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default ReusableTable;
