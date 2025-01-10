import React from 'react';
import HomeHeader from '@/components/Header/HomeHeader';
import HomeFooter from '@/components/HomeFooter/HomeFooter';
import { GetSession } from '@/libs/api-manager/manager';
import ProgressProvider from '@/libs/providers/ProgressProvider';

export default async function AgentSectionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await GetSession();
  const role = session?.role;
  return (
    <>
      <HomeHeader role={role} token={session.token} />
      <ProgressProvider color="black"> {children}</ProgressProvider>
      <HomeFooter role={role} />
    </>
  );
}
