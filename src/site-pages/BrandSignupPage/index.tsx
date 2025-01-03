import React from 'react';
import { Typography } from '@mui/material';
import { get } from 'lodash';
import BrandSignupForm from '@/features/BrandSignupForm';
import { SignupContent } from '@/interfaces';
import { GetSignupContent } from '@/libs/api-manager/manager';

const BrandSignupPage = async () => {
  const signupContent: SignupContent = await GetSignupContent();
  const brandSignupContent = get(signupContent, 'brand_intro_copy', '');
  const brandSignupOptions = get(signupContent, 'business_options', ['']);
  return (
    <>
      <Typography component="p">{brandSignupContent}</Typography>
      <BrandSignupForm brandSignupOptions={brandSignupOptions} />
    </>
  );
};

export default BrandSignupPage;
