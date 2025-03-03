import React from 'react';
import { Box, Toolbar } from '@mui/material';
import Image from 'next/image';
import './ProfileBuilderLayout.scss';
import { ProgressBarLink } from '@/components/ProgressBar';
import BackToHome from '@/components/BackToHome';
import { GetSession } from '@/libs/api-manager/manager';
import ProgressProvider from '@/libs/providers/ProgressProvider';
import { paths } from '@/helpers/paths';
import { UserRole } from '@/helpers/enums';
import UnauthorizedMessage from '@/components/UnauthorizedMessage';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await GetSession();
  if (session?.role !== UserRole.Vip) {
    return <UnauthorizedMessage />;
  }
  const homeLink = paths.root.home.getHref();
  return (
    <Box className="profile-builder__page">
      <Box className="profile-builder__header">
        <Toolbar className="profile-builder__wrapper">
          <ProgressBarLink href={homeLink}>
            <Image alt="VipLogo" src="/Logo.svg" width={120} height={30} priority style={{ objectFit: 'contain' }} />
          </ProgressBarLink>
          <BackToHome role={session?.role} />
        </Toolbar>
      </Box>
      <Box className="profile-builder__main">
        <ProgressProvider color="black">{children}</ProgressProvider>
      </Box>
    </Box>
  );
}
