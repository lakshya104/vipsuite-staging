import React from 'react';
import { cookies } from 'next/headers';
import HomeHeader from '@/components/Header';
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
    const {
      role,
      is_profile_builder_progressed,
      first_name,
      token,
      email,
      profile_id,
      last_login_at = '',
    } = session ?? {};

    if (
      !isSkipped &&
      ((role === UserRole.Vip && is_profile_builder_progressed !== 1) ||
        (role !== UserRole.Vip && !last_login_at.length))
    ) {
      return <ApplicationAcceptedDialog name={first_name} role={role} />;
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
