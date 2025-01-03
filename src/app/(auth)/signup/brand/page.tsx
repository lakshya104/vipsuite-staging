import React, { Suspense } from 'react';
import { Box, Typography } from '@mui/material';
import BrandSignupPage from '@/site-pages/BrandSignupPage';
import SignupLoading from '@/site-pages/VipSignupPage/loading';

const BrandSignup = async () => {
  return (
    <Box className="signup__page">
      <Box flexGrow={1} className="signup__page-inner">
        <Typography variant="h2">Sign up as a brand or PR agency</Typography>
        <Suspense fallback={<SignupLoading />}>
          <BrandSignupPage />
        </Suspense>
      </Box>
    </Box>
  );
};

export default BrandSignup;
