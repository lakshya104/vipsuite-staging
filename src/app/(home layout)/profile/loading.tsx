import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import './profile.scss';
import ProfilePageLoading from '@/site-pages/ProfilePage/loading';

export default function Loading() {
  return (
    <Box className="user-profile">
      <Container>
        <Typography className="page-title" variant="h2" align="center">
          Your Profile
        </Typography>
        <ProfilePageLoading />
      </Container>
    </Box>
  );
}
