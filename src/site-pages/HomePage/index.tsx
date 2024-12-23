import React from 'react';
import { cookies } from 'next/headers';
import { get, sum } from 'lodash';
import { GetDashboard, GetDashboardContent, GetSession } from '@/libs/api-manager/manager';
import DashboardItemsContainer from '@/components/DashboardItemsContainer';
import { getVipId } from '@/helpers/utils';
import { CookieName, UserRole } from '@/helpers/enums';
import ErrorHandler from '@/components/ErrorHandler';

const HomePage = async () => {
  const cookieStore = cookies();
  const userId = cookieStore.get(CookieName.VipId);
  const session = await GetSession();
  const { token, role, email } = session;
  if (role === UserRole.Agent && !userId) {
    return;
  }
  const vipId = getVipId(role, userId, session);
  const [
    { data: dashboardContent, error: dashboardContentError },
    { data: dashboardItems, error: dashboardItemsError },
  ] = await Promise.all([GetDashboardContent(), GetDashboard()]);
  if (dashboardContentError || dashboardItemsError) {
    return (
      <ErrorHandler
        error={dashboardContentError || dashboardItemsError}
        errMessage="Not able to show dashboard content currently."
      />
    );
  }
  const totalFollowerCount =
    role === UserRole.Vip
      ? sum([
          Number(get(session, 'acf.tiktok_follower_count', 0)),
          Number(get(session, 'acf.instagram_follower_count', 0)),
        ])
      : Number(cookieStore.get(CookieName.FollowerCount)?.value) || 0;

  return (
    <DashboardItemsContainer
      dashboardItems={dashboardItems}
      dashboardContent={dashboardContent}
      vipId={vipId}
      token={token}
      totalFollowerCount={totalFollowerCount}
      userRole={role}
      userEmail={email}
    />
  );
};

export default HomePage;
