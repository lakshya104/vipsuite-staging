import React from 'react';
import { Box, Toolbar } from '@mui/material';
import './ProfileBuilderLayout.scss';
import Image from 'next/image';
import ProgressProvider from '@/libs/providers/ProgressProvider';

export default async function AgentProfileBuilderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box className="profile-builder__page">
      <Box className="profile-builder__header">
        <Toolbar className="profile-builder__wrapper">
          <Image alt="VipLogo" src="/Logo.svg" width={120} height={30} priority style={{ objectFit: 'contain' }} />
        </Toolbar>
      </Box>
      <Box className="profile-builder__main">
        <ProgressProvider color="black"> {children}</ProgressProvider>
      </Box>
    </Box>
  );
}
