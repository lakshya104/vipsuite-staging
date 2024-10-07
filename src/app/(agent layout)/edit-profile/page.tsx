import React, { Suspense } from 'react';
import { Box, Typography } from '@mui/material';
import ProfilePageLoading from '@/site-pages/ProfilePage/loading';
import AgentEditProfilePage from '@/site-pages/AgentEditProfilePage';

const VipSignupPage = async () => {
  return (
    <Box className="signup__page">
      <Box flexGrow={1} className="signup__page-inner">
        <Typography variant="h2" gutterBottom>
          Your Profile
        </Typography>
        <Suspense fallback={<ProfilePageLoading />}>
          <AgentEditProfilePage />
        </Suspense>
      </Box>
    </Box>
  );
};

export default VipSignupPage;
