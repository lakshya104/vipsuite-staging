import React from 'react';
import { Box, Container, Skeleton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ProgressBarLink } from '@/components/ProgressBar';

const MessageDetailLoading = () => {
  return (
    <Box className="user-inbox order-details-page">
      <Container>
        <Typography className="page-title" variant="h2" align="center">
          <ProgressBarLink href={'/inbox'} aria-label="Back to Messages">
            <ArrowBackIcon />
          </ProgressBarLink>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Skeleton variant="text" height={75} sx={{ width: { md: '500px', xs: '250px' } }} />
          </Box>
        </Typography>
        <Box sx={{ p: 2, mb: 2 }}>
          <Skeleton variant="rectangular" height={100} />
          <Skeleton variant="text" width="50%" height={30} sx={{ mt: 2 }} />
        </Box>
        <Box sx={{ p: 2, mb: 2 }}>
          <Skeleton variant="rectangular" height={100} />
          <Skeleton variant="text" width="50%" height={30} sx={{ mt: 2 }} />
        </Box>
        <Box sx={{ p: 2, mb: 2 }}>
          <Skeleton variant="rectangular" height={100} />
          <Skeleton variant="text" width="50%" height={30} sx={{ mt: 2 }} />
        </Box>
      </Container>
    </Box>
  );
};

export default MessageDetailLoading;
