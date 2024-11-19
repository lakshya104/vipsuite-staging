import React from 'react';
import HomeHeader from '@/components/Header/HomeHeader';
import HomeFooter from '@/components/HomeFooter/HomeFooter';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { isEmpty } from 'lodash';
import { GetSession } from '@/libs/api-manager/manager';
import { CookieName, ProfileStatus, UserRole } from '@/helpers/enums';
import ApplicationAcceptedDialog from '@/components/ApplicationAcceptedDialog';
import VipPage from '../my-vips/page';
import ProfileReviewDialog from '@/components/ProfileReviewDialog';

export default async function HomeSectionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await GetSession();
  const { role, acf, first_name } = session;
  if (role === UserRole.Vip) {
    const { known_for, habits, profile_status } = acf;
    if (profile_status === ProfileStatus.Pending) {
      if (isEmpty(known_for)) {
        return <ApplicationAcceptedDialog name={first_name} role={UserRole.Vip} />;
      }
      if (!isEmpty(habits)) {
        return <ProfileReviewDialog role={role} />;
      }
      redirect('/vip-profile-builder');
    }
  } else if (role === UserRole.Agent) {
    const cookieStore = cookies();
    const userId = cookieStore.get(CookieName.VipId);
    if (!userId || userId?.value === undefined) {
      return <VipPage />;
    }
  }
  return (
    <>
      <HomeHeader role={role} />
      {children}
      <HomeFooter />
    </>
  );
}
