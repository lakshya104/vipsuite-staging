import React from 'react';
import { Box, Container, Skeleton, Typography } from '@mui/material';
import './profile.scss';

const ProfileSkeleton = () => {
  return (
    <Box className="user-profile">
      <Container>
        <Typography className="page-title" variant="h2" align="center">
          Your Profile
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', mt: 2 }}>
          <Skeleton variant="circular" width={120} height={120} />
          <Skeleton variant="text" sx={{ fontSize: '1.5rem', width: '30%' }} />
          <Skeleton variant="text" sx={{ width: '20%' }} />
          <Skeleton variant="rectangular" width={100} height={30} sx={{ marginTop: '8px' }} />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginY: '24px' }}>
          <Skeleton variant="rectangular" width="30%" height={40} sx={{ marginX: '8px' }} />
          <Skeleton variant="rectangular" width="30%" height={40} sx={{ marginX: '8px' }} />
          <Skeleton variant="rectangular" width="30%" height={40} sx={{ marginX: '8px' }} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px', marginLeft: '50px' }}>
          {[...Array(4)].map((_, index) => (
            <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Skeleton variant="text" width="90%" height={40} />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default ProfileSkeleton;
