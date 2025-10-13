import React from 'react';
import { Box, Toolbar } from '@mui/material';
import Image from 'next/image';
import './ProfileBuilderLayout.scss';
import { GetSession } from '@/libs/api-manager/manager';
import ProgressProvider from '@/libs/providers/ProgressProvider';
import { UserRole } from '@/helpers/enums';
import UnauthorizedMessage from '@/components/UnauthorizedMessage';
import StoreUserDetails from '@/components/StoreUserDetails';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await GetSession();
  if (session?.role !== UserRole.Vip) {
    return <UnauthorizedMessage />;
  }
  return (
    <Box className="profile-builder__page">
      <Box className="profile-builder__header">
        <Toolbar className="profile-builder__wrapper">
          <Image alt="VipLogo" src="/Logo.svg" width={120} height={30} priority style={{ objectFit: 'contain' }} />
        </Toolbar>
      </Box>
      <Box className="profile-builder__main">
        <StoreUserDetails
          token={session?.token}
          userEmail={session?.email}
          userRole={session?.role}
          vipId={session?.profile_id}
        />
        <ProgressProvider color="black">{children}</ProgressProvider>
      </Box>
    </Box>
  );
}
