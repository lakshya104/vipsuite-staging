import * as React from 'react';
import { Box, Typography } from '@mui/material';
import VipSignupForm from '@/features/VipSignupForm/VipSignupForm';
import { GetSignupContent } from '@/libs/api-manager/manager';
import { SignupContent } from '@/interfaces/signup';

const VipSignupPage = async () => {
  const signupContent: SignupContent = await GetSignupContent();
  const vipSignupContent = signupContent.vip_intro_copy;
  return (
    <Box className="signup__page">
      <Box flexGrow={1} className="signup__page-inner">
        <Typography variant="h2">Apply as a VIP</Typography>
        <Typography component="p">{vipSignupContent}</Typography>
        <VipSignupForm />
      </Box>
    </Box>
  );
};

export default VipSignupPage;
