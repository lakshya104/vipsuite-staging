import React from 'react';
import { Skeleton, Box, Typography } from '@mui/material';

const VipPageLoading = () => {
  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <Typography variant="h2" sx={{ mb: 2 }}>
        <Skeleton width="40%" />
      </Typography>
      <Skeleton variant="rectangular" width="100%" height={400} />
      <Box sx={{ mt: 2 }}>
        <Skeleton width="60%" height={30} />
        <Skeleton width="80%" height={30} />
        <Skeleton width="70%" height={30} />
      </Box>
    </Box>
  );
};

export default VipPageLoading;
