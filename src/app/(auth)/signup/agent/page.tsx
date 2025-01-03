import React, { Suspense } from 'react';
import { Box, Typography } from '@mui/material';
import AgentSignupPage from '@/site-pages/AgentSignupPage';
import SignupLoading from '@/site-pages/VipSignupPage/loading';

const AgentSignup = async () => {
  return (
    <Box className="signup__page">
      <Box flexGrow={1} className="signup__page-inner">
        <Typography variant="h2">Sign up as a manager, publicist or commercial agent</Typography>
        <Suspense fallback={<SignupLoading />}>
          <AgentSignupPage />
        </Suspense>
      </Box>
    </Box>
  );
};

export default AgentSignup;
