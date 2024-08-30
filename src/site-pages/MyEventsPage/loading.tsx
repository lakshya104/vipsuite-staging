import React from 'react';
import { Box, Skeleton } from '@mui/material';

const MyEventsPageLoading = () => {
  return (
    <Box sx={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {[...Array(6)].map((_, index) => (
        <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ flexGrow: 1 }}>
            <Skeleton variant="text" sx={{ fontSize: '1.5rem', width: '60%' }} />
            <Skeleton variant="text" sx={{ width: '40%' }} />
            <Skeleton variant="text" sx={{ width: '30%' }} />
          </Box>
          <Skeleton variant="circular" width={40} height={40} />
        </Box>
      ))}
    </Box>
  );
};

export default MyEventsPageLoading;
