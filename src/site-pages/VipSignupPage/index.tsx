import React from 'react';
import { Typography } from '@mui/material';
import VipSignupForm from '@/features/VipSignupForm/VipSignupForm';
import { SignupContent } from '@/interfaces';
import { GetSignupContent } from '@/libs/api-manager/manager';

const VipSignupPage = async () => {
  const signupContent: SignupContent = await GetSignupContent();
  const vipSignupContent = signupContent?.vip_intro_copy;
  return (
    <>
      <Typography component="p" sx={{ color: '#a4a49f !important' }}>
        {vipSignupContent}
      </Typography>
      <VipSignupForm />
    </>
  );
};

export default VipSignupPage;
