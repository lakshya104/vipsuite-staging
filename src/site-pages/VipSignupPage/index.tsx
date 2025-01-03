import VipSignupForm from '@/features/VipSignupForm/VipSignupForm';
import { SignupContent } from '@/interfaces';
import { GetSignupContent } from '@/libs/api-manager/manager';
import { Typography } from '@mui/material';
import React from 'react';

const VipSignupPage = async () => {
  const signupContent: SignupContent = await GetSignupContent();
  const vipSignupContent = signupContent?.vip_intro_copy;
  return (
    <>
      <Typography component="p">{vipSignupContent}</Typography>
      <VipSignupForm />
    </>
  );
};

export default VipSignupPage;
