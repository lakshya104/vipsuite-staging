import React from 'react';
import { cookies } from 'next/headers';
import { get, sum } from 'lodash';
import { GetDashboard, GetDashboardContent, GetSession } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import DashboardItemsContainer from '@/components/DashboardItemsContainer';
import { getVipId } from '@/helpers/utils';
import { CookieName, UserRole } from '@/helpers/enums';

const HomePage = async () => {
  const cookieStore = cookies();
  const userId = cookieStore.get(CookieName.VipId);
  const session = await GetSession();
  const { token, role, email } = session;
  const vipId = getVipId(role, userId, session);
  const [dashboardContent, dashboardItems] = await Promise.all([
    GetDashboardContent(vipId, token),
    GetDashboard(vipId, token),
  ]);
  const totalFollowerCount =
    role === UserRole.Vip
      ? sum([get(session, 'acf.tiktok_follower_count', 0), get(session, 'acf.instagram_follower_count', 0)])
      : cookieStore.get(CookieName.FollowerCount)?.value || 0;

  if (!dashboardItems) {
    return <ErrorFallback errorMessage="Currently there is no dashboard item." hideSubtext={true} />;
  }

  return (
    <DashboardItemsContainer
      dashboardItems={dashboardItems}
      dashboardContent={dashboardContent}
      vipId={vipId}
      token={token}
      totalFollowerCount={Number(totalFollowerCount)}
      userRole={role}
      userEmail={email}
    />
  );
};

export default HomePage;
