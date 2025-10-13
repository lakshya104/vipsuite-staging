import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import HomeHeader from '@/components/Header';
import HomeFooter from '@/components/HomeFooter';
import { GetAllVips, GetSession } from '@/libs/api-manager/manager';
import { CookieName, UserRole } from '@/helpers/enums';
import ApplicationAcceptedDialog from '@/components/ApplicationAcceptedDialog';
import StoreUserDetails from '@/components/StoreUserDetails';
import ProgressProvider from '@/libs/providers/ProgressProvider';
import ErrorHandler from '@/components/ErrorHandler';
import en from '@/helpers/lang';
import { paths } from '@/helpers/paths';
import { MyVips } from '@/interfaces';

export default async function HomeSectionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  try {
    const [session, cookieStore] = await Promise.all([GetSession(), cookies()]);
    const isSkipped = cookieStore.get(CookieName.SkipProfile);
    const isVipAdded = cookieStore.get(CookieName.VipAdded);
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
      vip_profiles_count = 0,
    } = session ?? {};

    if (role === UserRole.Vip) {
      if (!isSkipped && is_profile_builder_progressed !== 1) {
        return <ApplicationAcceptedDialog name={first_name} role={role} brandName={brand_name} />;
      }
      if (is_profile_completed !== 1 && !isProfileCompleted) {
        redirect(paths.root.vipProfileBuilder.getHref());
      }
    }

    if (!isSkipped && role === UserRole.Brand && !last_login_at.length) {
      return <ApplicationAcceptedDialog name={first_name} role={role} brandName={brand_name} />;
    }

    if (role === UserRole.Agent) {
      if (!isSkipped && !last_login_at.length) {
        return <ApplicationAcceptedDialog name={first_name} role={role} brandName={brand_name} />;
      } else if (!isVipAdded) {
        if (vip_profiles_count === 0) {
          redirect(paths.root.agentProfileBuilder.getHref());
        }
        if (vip_profiles_count === 1) {
          let allVips: MyVips[] = [];
          try {
            const response = await GetAllVips();
            allVips = response?.data;
          } catch (err) {
            console.error('Error fetching VIPs:', err);
          }
          const firstVip = allVips?.[0];
          if (firstVip?.profile_id && firstVip?.is_profile_completed === 0) {
            redirect(`/api/set-vip-cookie?vipId=${firstVip?.profile_id}`);
          }
        }
      }
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
