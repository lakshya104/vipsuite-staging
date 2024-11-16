import React from 'react';
import HomeHeader from '@/components/Header/HomeHeader';
import HomeFooter from '@/components/HomeFooter/HomeFooter';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { isEmpty } from 'lodash';
import { GetSession } from '@/libs/api-manager/manager';
import { CookieName, ProfileStatus, UserRole } from '@/helpers/enums';
import ApplicationAcceptedDialog from '@/components/ApplicationAcceptedDialog';
import ApplicationReviewDialog from '@/components/ApplicationReviewDialog';
import VipPage from '../my-vips/page';

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
        return <ApplicationAcceptedDialog name={first_name} />;
      }
      if (!isEmpty(habits)) {
        return <ApplicationReviewDialog />;
      }
      redirect('/vip-profile-builder');
    }
  }
  const cookieStore = cookies();
  const userId = cookieStore.get(CookieName.VipId);
  if (role === UserRole.Agent && (!userId || userId?.value === undefined)) {
    return <VipPage />;
  }
  return (
    <>
      <HomeHeader role={role} />
      {children}
      <HomeFooter />
    </>
  );
}
