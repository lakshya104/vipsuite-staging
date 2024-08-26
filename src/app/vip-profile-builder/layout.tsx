import React from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';
import './ProfileBuilderLayout.scss';
import { auth } from '@/auth';
import { get } from 'lodash';
import { ProgressBarLink } from '@/components/ProgressBar';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const profile_status = get(session, 'user.acf.profile_status', {});
  let homeLink = '/vip-profile-builder';
  if (profile_status !== 'pending') homeLink = '/home';
  return (
    <Box className="profile-builder__page">
      <Box className="profile-builder__header">
        <ProgressBarLink href={homeLink}>
          <Image alt="VipLogo" src="/vipsblack.png" width={120} height={30} priority style={{ objectFit: 'contain' }} />
        </ProgressBarLink>
      </Box>
      <Box className="profile-builder__main">{children}</Box>
    </Box>
  );
}
