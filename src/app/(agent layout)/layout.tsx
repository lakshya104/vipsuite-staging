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
  const token = (session?.user as unknown as Session)?.token;
  const role = (session?.user as unknown as Session)?.role;
  const id = (session?.user as unknown as Session)?.id;
  return (
    <>
      <HomeHeader token={token} role={role} />
      {children}
      <HomeFooter token={token} id={id} />
    </>
  );
}
