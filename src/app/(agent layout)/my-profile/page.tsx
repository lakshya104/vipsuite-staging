import React, { Suspense } from 'react';
import { Box, Container, Typography } from '@mui/material';
import './profile.scss';
import ProfilePageLoading from '@/site-pages/ProfilePage/loading';
import AgentProfilePage from '@/site-pages/AgentProfilePage';
import en from '@/helpers/lang';

export default async function Page() {
  return (
    <Box className="user-profile">
      <Container>
        <Typography className="page-title" variant="h2" align="center">
          {en.agentLayout.myProfile}
        </Typography>
        <Suspense fallback={<ProfilePageLoading />}>
          <AgentProfilePage />
        </Suspense>
      </Container>
    </Box>
  );
}
