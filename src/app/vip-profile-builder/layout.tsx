import React from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';
import './ProfileBuilderLayout.scss';
import { ProgressBarLink } from '@/components/ProgressBar';
import BackToHome from '@/components/BackToHome';
import { GetSession } from '@/libs/api-manager/manager';
import { ProfileStatus } from '@/helpers/enums';
import ProgressProvider from '@/libs/providers/ProgressProvider';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await GetSession();
  const profileStatus = session.acf.profile_status;
  let homeLink = '/vip-profile-builder';
  if (profileStatus !== ProfileStatus.Pending) homeLink = '/home';
  return (
    <Box className="profile-builder__page">
      <Box className="profile-builder__header">
        <ProgressBarLink href={homeLink}>
          <Image alt="VipLogo" src="/vipsblack.png" width={120} height={30} priority style={{ objectFit: 'contain' }} />
        </ProgressBarLink>
        {profileStatus === ProfileStatus.Approved && <BackToHome role={session.role} />}
      </Box>
      <Box className="profile-builder__main">
        <ProgressProvider color="black"> {children}</ProgressProvider>
      </Box>
    </Box>
  );
}
