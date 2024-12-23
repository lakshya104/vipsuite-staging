import React from 'react';
import { Box, Typography } from '@mui/material';

export default function NotFound() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
      <Box textAlign="center" mt="25px">
        <Typography color="black" sx={{ fontSize: '50px', fontWeight: '800', marginBottom: '10px' }}>
          404!
        </Typography>
        <Typography fontWeight="800" color="black">
          This page is currently not available
        </Typography>
      </Box>
    </Box>
  );
}
