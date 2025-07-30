import React from 'react';
import HomeHeader from '@/components/Header';
import HomeFooter from '@/components/HomeFooter';
import { GetSession } from '@/libs/api-manager/manager';
import ProgressProvider from '@/libs/providers/ProgressProvider';
import { UserRole } from '@/helpers/enums';
import UnauthorizedMessage from '@/components/UnauthorizedMessage';

export default async function AgentSectionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await GetSession();
  const role = session?.role;
  if (session?.role !== UserRole.Agent) {
    return <UnauthorizedMessage />;
  }
  return (
    <>
      <HomeHeader role={role} />
      <ProgressProvider color="black"> {children}</ProgressProvider>
      <HomeFooter role={role} />
    </>
  );
}
