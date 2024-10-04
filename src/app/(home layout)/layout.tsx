import React from 'react';
import HomeHeader from '@/components/Header/HomeHeader';
import HomeFooter from '@/components/HomeFooter/HomeFooter';
import { redirect } from 'next/navigation';
import { get } from 'lodash';
import { GetSession } from '@/libs/api-manager/manager';
import { cookies } from 'next/headers';
import { UserRole } from '@/helpers/enums';

export default async function HomeSectionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await GetSession();
  const { token, role, id } = session;
  const profile_status = get(session, 'acf.profile_status', {});
  if (profile_status === 'pending') redirect('/vip-profile-builder');
  const cookieStore = cookies();
  const userId = cookieStore.get('vipId');
  if (role === UserRole.Agent && (!userId || userId?.value === undefined)) {
    return redirect('/my-vips');
  }
  return (
    <>
      <HomeHeader token={token} role={role} />
      {children}
      <HomeFooter token={token} id={id} />
    </>
  );
}
