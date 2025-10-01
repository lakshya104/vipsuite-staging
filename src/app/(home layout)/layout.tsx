import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
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
    const isProfileCompleted = cookieStore.get(CookieName.ProfileCompleted);
    const {
      role,
      is_profile_builder_progressed = 0,
      first_name,
      token,
      email,
      profile_id,
      last_login_at = '',
      brand_name,
      is_profile_completed = 0,
    } = session ?? {};

    if (role === UserRole.Vip) {
      if (!isSkipped && is_profile_builder_progressed !== 1) {
        return <ApplicationAcceptedDialog name={first_name} role={role} brandName={brand_name} />;
      }
      if (is_profile_completed !== 1 && !isProfileCompleted) {
        redirect('/vip-profile-builder');
      }
    }

    if (!isSkipped && role !== UserRole.Vip && !last_login_at.length) {
      return <ApplicationAcceptedDialog name={first_name} role={role} brandName={brand_name} />;
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
    if (isRedirectError(error)) {
      throw error;
    }
    return <ErrorHandler errMessage={en.common.somethingWentWrongMessage} error={error} />;
  }
}
