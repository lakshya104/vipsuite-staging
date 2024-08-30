import React from 'react';
import HomeHeader from '@/components/Header/HomeHeader';
import HomeFooter from '@/components/HomeFooter/HomeFooter';
import { Box } from '@mui/material';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { get } from 'lodash';

export default async function HomeSectionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const profile_status = get(session, 'user.acf.profile_status', {});
  if (profile_status === 'pending') redirect('/vip-profile-builder');

  return (
    <>
      <HomeHeader />
      <Box pb={6}> {children}</Box>
      <HomeFooter />
    </>
  );
}
