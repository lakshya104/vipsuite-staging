import React from 'react';
import HomeHeader from '@/components/Header/HomeHeader';
import HomeFooter from '@/components/HomeFooter/HomeFooter';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { isEmpty } from 'lodash';
import { GetSession } from '@/libs/api-manager/manager';
import { CookieName, ProfileStatus, UserRole } from '@/helpers/enums';
import ApplicationAcceptedDialog from '@/components/ApplicationAcceptedDialog';
import VipPage from '../(my vips)/my-vips/page';
import ProfileReviewDialog from '@/components/ProfileReviewDialog';
import StoreUserDetails from '@/components/StoreUserDetails';
import { getVipId } from '@/helpers/utils';
import ProgressProvider from '@/libs/providers/ProgressProvider';

export default async function HomeSectionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await GetSession();
  const cookieStore = await cookies();
  const userId = cookieStore.get(CookieName.VipId);
  const { role, acf, first_name, token, email } = session;
  const vipId = getVipId(role, userId, session);
  if (role === UserRole.Vip) {
    const { known_for, habits, profile_status } = acf;
    if (profile_status === ProfileStatus.Pending) {
      if (isEmpty(known_for)) {
        return <ApplicationAcceptedDialog name={first_name} role={UserRole.Vip} />;
      }
      if (!isEmpty(habits)) {
        return <ProfileReviewDialog role={role} token={token} />;
      }
      redirect('/vip-profile-builder');
    }
  } else if (role === UserRole.Agent) {
    if (!userId || userId?.value === undefined) {
      return <VipPage />;
    }
  } else if (role === UserRole.Brand) {
    return <ApplicationAcceptedDialog name={first_name} role={UserRole.Brand} />;
  }
  return (
    <>
      <StoreUserDetails token={token} userEmail={email} userRole={role} vipId={vipId} />
      <HomeHeader role={role} token={token} />
      <ProgressProvider color="black"> {children}</ProgressProvider>
      <HomeFooter role={role} />
    </>
  );
}
