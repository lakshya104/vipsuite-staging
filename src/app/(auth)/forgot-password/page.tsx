import React from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';
import ForgotPassword from '@/features/ForgotPasswordForm';

const ForgotPasswordPage = () => {
  return (
    <Box className="login__page">
      <Box flexGrow={1} className="login__page-logo">
        <Image
          alt="VipLogo"
          src="/VIPSLogo.png"
          fill
          sizes="(max-width: 300px) 100vw, 300px"
          style={{ objectFit: 'contain' }}
          priority
        />
      </Box>
      <ForgotPassword />
    </Box>
  );
};

export default ForgotPasswordPage;