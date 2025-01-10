import React from 'react';
import { Box } from '@mui/material';
import './ProfileBuilderLayout.scss';
import { ProgressBarLink } from '@/components/ProgressBar';
import BackToHome from '@/components/BackToHome';
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
        <ProgressBarLink href={'/home'}>
          <Image alt="VipLogo" src="/vipsblack.png" width={120} height={30} priority style={{ objectFit: 'contain' }} />
        </ProgressBarLink>
        <BackToHome />
      </Box>
      <Box className="profile-builder__main">
        <ProgressProvider color="black"> {children}</ProgressProvider>
      </Box>
    </Box>
  );
}
