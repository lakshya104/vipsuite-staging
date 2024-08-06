import React from 'react';
import HomeHeader from '@/components/Header/HomeHeader';
import HomeFooter from '@/components/HomeFooter';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

interface User {
  id: number;
  name: string;
  is_profile_approved: boolean;
}

export default async function HomeSectionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const isProfileApproved = (session?.user as unknown as User)?.is_profile_approved;
  if (isProfileApproved.toString() === '0') redirect('/vip-profile-builder/step1');

  return (
    <>
      <HomeHeader />
      {children}
      <HomeFooter />
    </>
  );
}
