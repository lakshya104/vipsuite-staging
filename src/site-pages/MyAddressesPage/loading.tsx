import React from 'react';
import { Box, Skeleton } from '@mui/material';

const MyAddressesPageLoading = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {[...Array(6)].map((_, index) => (
        <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box className="address__list-info" sx={{ flexGrow: 1 }}>
            <Skeleton variant="text" height={40} sx={{ width: '40%' }} />
            <Skeleton variant="text" sx={{ width: '50%' }} />
            <Skeleton variant="text" sx={{ width: '50%' }} />
          </Box>
          <Skeleton variant="rectangular" width={40} height={40} sx={{ marginRight: 2 }} />
          <Skeleton variant="rectangular" width={40} height={40} />
        </Box>
      ))}
    </Box>
  );
};

export default MyAddressesPageLoading;
