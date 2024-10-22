import React from 'react';
import { cookies } from 'next/headers';
import { get } from 'lodash';
import { GetDashboard, GetDashboardContent, GetSession } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';
import DashboardItemsContainer from '@/components/DashboardItemsContainer';
import { getVipId } from '@/helpers/utils';
import { UserRole } from '@/helpers/enums';

const HomePage = async () => {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get('vipId');
    const session = await GetSession();
    const { token, role, email } = session;
    const vipId = getVipId(role, userId, session);
    const [dashboardContent, dashboardItems] = await Promise.all([
      GetDashboardContent(token, vipId),
      GetDashboard(token, vipId),
    ]);
    const tiktokFollowerCount = get(session, 'acf.tiktok_follower_count', 0);
    const instagramFollowerCount = get(session, 'acf.instagram_follower_count', 0);
    const totalFollowerCount =
      role === UserRole.Vip ? tiktokFollowerCount + instagramFollowerCount : cookieStore.get('followers')?.value;
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
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to show dashboard currently." />;
  }
};

export default HomePage;
