import React from 'react';
import { Box, Skeleton, Typography } from '@mui/material';

const ProductSkeletonItem = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', padding: 2, borderBottom: '1px solid #e0e0e0' }}>
      <Skeleton variant="rectangular" width={80} height={80} sx={{ marginRight: 2 }} />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1">
          <Skeleton width="60%" />
        </Typography>
        <Typography variant="body2">
          <Skeleton width="40%" />
        </Typography>
        <Typography variant="body2">
          <Skeleton width="30%" />
        </Typography>
      </Box>
      <Skeleton variant="circular" width={24} height={24} />
    </Box>
  );
};

const BasketPageLoading = () => {
  return (
    <Box>
      {[...Array(6)].map((_, index) => (
        <ProductSkeletonItem key={index} />
      ))}
    </Box>
  );
};

export default BasketPageLoading;
