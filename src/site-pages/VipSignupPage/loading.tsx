import React from 'react';
import { Skeleton, Box } from '@mui/material';

const SignupLoading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        gap: 4,
      }}
    >
      <Skeleton variant="text" width="100%" height={150} sx={{ bgcolor: 'gray', borderRadius: '3px' }} />
      <Skeleton variant="rectangular" width="100%" height={50} sx={{ bgcolor: 'gray', borderRadius: '25px' }} />
      <Skeleton variant="rectangular" width="100%" height={50} sx={{ bgcolor: 'gray', borderRadius: '25px' }} />
      <Skeleton variant="rectangular" width="100%" height={50} sx={{ bgcolor: 'gray', borderRadius: '25px' }} />
      <Skeleton variant="rectangular" width="100%" height={50} sx={{ bgcolor: 'gray', borderRadius: '25px' }} />
      <Skeleton variant="rectangular" width="100%" height={50} sx={{ bgcolor: 'gray', borderRadius: '25px' }} />
      <Skeleton variant="rectangular" width="100%" height={50} sx={{ bgcolor: 'gray', borderRadius: '25px' }} />
      <Skeleton variant="rectangular" width="100%" height={50} sx={{ bgcolor: 'gray', borderRadius: '25px' }} />
      <Skeleton variant="rectangular" width="100%" height={50} sx={{ bgcolor: 'gray', borderRadius: '25px' }} />
    </Box>
  );
};

export default SignupLoading;
