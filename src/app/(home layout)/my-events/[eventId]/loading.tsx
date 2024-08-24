import React from 'react';
import { Box, Container, Skeleton, Typography } from '@mui/material';
import '../event.scss';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const EventDetailsSkeleton = () => {
  return (
    <Box className="user-profile order-details-page">
      <Container>
        <Typography className="page-title" variant="h2" align="center">
          <Link href={'/my-orders'} aria-label="Back to My Orders">
            <ArrowBackIcon />
          </Link>
          Event Title
        </Typography>
        <Skeleton variant="text" width="30%" height={30} />
        <Skeleton variant="text" width="30%" height={20} sx={{ mb: 2 }} />
        <Box sx={{ p: 2, mb: 2 }}>
          <Skeleton variant="rectangular" height={100} />
          <Skeleton variant="text" width="50%" height={30} sx={{ mt: 2 }} />
        </Box>
        <Box sx={{ p: 2, mb: 2 }}>
          <Skeleton variant="rectangular" height={100} />
          <Skeleton variant="text" width="50%" height={30} sx={{ mt: 2 }} />
        </Box>
        <Skeleton variant="text" width="40%" height={30} sx={{ mt: 4, mb: 2 }} />
        <Skeleton variant="rectangular" width="100%" height={40} sx={{ mb: 2 }} />
        <Skeleton variant="text" width="80%" height={30} />
        <Skeleton variant="rectangular" width="100%" height={80} sx={{ mt: 2 }} />
      </Container>
    </Box>
  );
};

export default EventDetailsSkeleton;
