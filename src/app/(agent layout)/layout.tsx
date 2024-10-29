import React from 'react';
import HomeHeader from '@/components/Header/HomeHeader';
import HomeFooter from '@/components/HomeFooter/HomeFooter';
import { auth } from '@/auth';
import { Session } from '@/interfaces';

export default async function AgentSectionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const role = (session?.user as unknown as Session)?.role;
  return (
    <>
      <HomeHeader role={role} />
      {children}
      <HomeFooter />
    </>
  );
}
