import React from 'react';
import { cookies } from 'next/headers';
import { isEmpty } from 'lodash';
import HomeHeader from '@/components/Header/HomeHeader';
import HomeFooter from '@/components/HomeFooter';
import { GetSession } from '@/libs/api-manager/manager';
import { CookieName, UserRole } from '@/helpers/enums';
import ApplicationAcceptedDialog from '@/components/ApplicationAcceptedDialog';
import StoreUserDetails from '@/components/StoreUserDetails';
import ProgressProvider from '@/libs/providers/ProgressProvider';
import ErrorHandler from '@/components/ErrorHandler';
import en from '@/helpers/lang';

export default async function HomeSectionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  try {
    const [session, cookieStore] = await Promise.all([GetSession(), cookies()]);
    const isSkipped = cookieStore.get(CookieName.SkipProfile);
    const { role, acf, first_name, token, email, profile_id } = session ?? {};

    if (role === UserRole.Vip && isEmpty(acf?.known_for) && !isSkipped) {
      return <ApplicationAcceptedDialog name={first_name} role={UserRole.Vip} />;
    }

    return (
      <>
        <StoreUserDetails token={token} userEmail={email} userRole={role} vipId={profile_id} />
        <HomeHeader role={role} />
        <ProgressProvider color="black"> {children}</ProgressProvider>
        <HomeFooter role={role} />
      </>
    );
  } catch (error) {
    return <ErrorHandler errMessage={en.common.somethingWentWrongMessage} error={error} />;
  }
}
