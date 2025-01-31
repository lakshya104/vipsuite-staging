import React, { Suspense } from 'react';
import { Box, Container, Typography } from '@mui/material';
import './profile.scss';
import ProfilePage from '@/site-pages/ProfilePage';
import ProfilePageLoading from '@/site-pages/ProfilePage/loading';
import en from '@/helpers/lang';

export default async function Page() {
  return (
    <Box className="user-profile">
      <Container>
        <Typography className="page-title" variant="h2" align="center">
          {en.profilePage.title}
        </Typography>
        <Suspense fallback={<ProfilePageLoading />}>
          <ProfilePage />
        </Suspense>
      </Container>
    </Box>
  );
}
