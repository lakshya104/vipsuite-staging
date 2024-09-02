import React from 'react';
import { Box, Typography, Skeleton } from '@mui/material';
const OpportunityDetailsLoading = () => {
  return (
    <>
      <Typography className="page-title" variant="h2" component="h1" align="center">
        <Box display="flex" justifyContent="center">
          <Skeleton width="25%" height={50} />
        </Box>
      </Typography>
      <Box>
        <Skeleton variant="rectangular" width="100%" height={400} />
      </Box>
      <Box>
        <Skeleton variant="text" width="30%" height={45} />
        <Skeleton variant="text" width="30%" height={35} />
        <Skeleton variant="text" width="30%" height={35} />
      </Box>
      <Box>
        <Skeleton variant="text" width="30%" height={45} />
        <Skeleton variant="text" width="100%" height={95} />
      </Box>
      <Box
        className="gray-card"
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'space-between'}
        gap={2.5}
        mt={2}
      >
        <Skeleton variant="rectangular" width="100%" height={200} />
        <Skeleton variant="rectangular" width="100%" height={200} />
      </Box>
      <Box className="product-list__page" mt={4}>
        <Skeleton height={100} width="10%" />
      </Box>
    </>
  );
};

export default OpportunityDetailsLoading;
