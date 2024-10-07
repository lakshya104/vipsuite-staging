import React from 'react';
import { Skeleton, Box, Container } from '@mui/material';

const VipPageLoading = () => {
  return (
    <Container maxWidth="xl" sx={{ minHeight: '100vh' }}>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', mt: 3, flexDirection: 'column', alignItems: 'center', mb: 6 }}
      >
        <Skeleton variant="text" width="40%" height={70} />
      </Box>
      <Skeleton variant="rectangular" width="100%" height={700} />
      <Box sx={{ mt: 2 }}>
        <Skeleton width="60%" height={30} />
        <Skeleton width="80%" height={30} />
        <Skeleton width="70%" height={30} />
      </Box>
    </Container>
  );
};

export default VipPageLoading;
