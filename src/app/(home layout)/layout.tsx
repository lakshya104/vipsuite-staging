import React from 'react';
import HomeHeader from '@/components/Header/HomeHeader';
import HomeFooter from '@/components/HomeFooter/HomeFooter';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { get } from 'lodash';
import { Session } from '@/interfaces';

export default async function HomeSectionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const profile_status = get(session, 'user.acf.profile_status', {});
  if (profile_status === 'pending') redirect('/vip-profile-builder');
  const token = (session?.user as unknown as Session)?.token;
  const role = (session?.user as unknown as Session)?.role;
  const id = (session?.user as unknown as Session)?.id;
  const vipId = (session?.user as unknown as Session)?.vip_profile_id;
  return (
    <>
      <HomeHeader token={token} role={role} />
      {children}
      <HomeFooter token={token} id={id} vipId={vipId} />
    </>
  );
}
