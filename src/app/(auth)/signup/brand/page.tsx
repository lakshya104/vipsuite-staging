import * as React from 'react';
import { Box, Typography } from '@mui/material';
import BrandSignupForm from '@/features/BrandSignupForm';
import { SignupContent } from '@/interfaces/signup';
import { GetSignupContent } from '@/libs/api-manager/manager';
import { get } from 'lodash';

const VipSignupPage = async () => {
  const signupContent: SignupContent = await GetSignupContent();
  const brandSignupContent = get(signupContent, 'brand_intro_copy', '');
  return (
    <Box className="signup__page">
      <Box flexGrow={1} className="signup__page-inner">
        <Typography variant="h2">Sign up as a brand or PR agency</Typography>
        <Typography component="p">{brandSignupContent}</Typography>
        <BrandSignupForm />
      </Box>
    </Box>
  );
};

export default VipSignupPage;
