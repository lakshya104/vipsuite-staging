import React from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';
import './ProfileBuilderLayout.scss';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box className="profile-builder__page">
      <Box className="profile-builder__header">
        <Image alt="VipLogo" src="/Logo.svg" width={260} height={70} style={{ objectFit: 'contain' }} />
      </Box>
      <Box className="profile-builder__main">{children}</Box>
    </Box>
  );
}
