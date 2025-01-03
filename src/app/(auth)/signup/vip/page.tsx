import React, { Suspense } from 'react';
import { Box, Typography } from '@mui/material';
import VipSignupPage from '@/site-pages/VipSignupPage';
import SignupLoading from '@/site-pages/VipSignupPage/loading';

const VipSignup = async () => {
  return (
    <Box className="signup__page">
      <Box flexGrow={1} className="signup__page-inner">
        <Typography variant="h2">Apply as a VIP</Typography>
        <Suspense fallback={<SignupLoading />}>
          <VipSignupPage />
        </Suspense>
      </Box>
    </Box>
  );
};

export default VipSignup;
