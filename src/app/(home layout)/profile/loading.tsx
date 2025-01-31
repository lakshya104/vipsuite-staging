import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import './profile.scss';
import ProfilePageLoading from '@/site-pages/ProfilePage/loading';
import en from '@/helpers/lang';

export default function Loading() {
  return (
    <Box className="user-profile">
      <Container>
        <Typography className="page-title" variant="h2" align="center">
          {en.profilePage.title}
        </Typography>
        <ProfilePageLoading />
      </Container>
    </Box>
  );
}
