import React from 'react';
import { Box, Toolbar } from '@mui/material';
import './ProfileBuilderLayout.scss';
import { ProgressBarLink } from '@/components/ProgressBar';
import BackToHome from '@/components/BackToHome';
import Image from 'next/image';
import ProgressProvider from '@/libs/providers/ProgressProvider';
import { paths } from '@/helpers/paths';

export default async function AgentProfileBuilderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box className="profile-builder__page">
      <Box className="profile-builder__header">
        <Toolbar className="profile-builder__wrapper">
          <ProgressBarLink href={paths.root.home.getHref()}>
            <Image alt="VipLogo" src="/Logo.svg" width={120} height={30} priority style={{ objectFit: 'contain' }} />
          </ProgressBarLink>
          <BackToHome />
        </Toolbar>
      </Box>
      <Box className="profile-builder__main">
        <ProgressProvider color="black"> {children}</ProgressProvider>
      </Box>
    </Box>
  );
}
