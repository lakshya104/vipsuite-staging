import React from 'react';
import { cookies } from 'next/headers';
import { get } from 'lodash';
import { GetDashboard, GetDashboardContent, GetSession } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';
import DashboardItemsContainer from '@/components/DashboardItemsContainer';
import { UserRole } from '@/helpers/enums';

const HomePage = async () => {
  const cookieStore = cookies();
  const userId = cookieStore.get('vipId');
  try {
    const session = await GetSession();
    const { token, vip_profile_id, role: userRole, email: userEmail } = session;
    const vipId = userRole === UserRole.Vip ? vip_profile_id : Number(userId?.value);
    const [dashboardContent, dashboardItems] = await Promise.all([
      GetDashboardContent(token, vipId),
      GetDashboard(token, vipId),
    ]);
    const tiktokFollowerCount = get(session, 'acf.tiktok_follower_count', 0);
    const instagramFollowerCount = get(session, 'acf.instagram_follower_count', 0);
    const totalFollowerCount = Number(tiktokFollowerCount) + Number(instagramFollowerCount);
    if (!dashboardItems) {
      return <ErrorFallback errorMessage="Currently there is no dashboard item." hideSubtext={true} />;
    }
    return (
      <DashboardItemsContainer
        dashboardItems={dashboardItems}
        dashboardContent={dashboardContent}
        vipId={vipId}
        token={token}
        totalFollowerCount={userRole === UserRole.Vip ? totalFollowerCount : 0}
        userRole={userRole}
        userEmail={userEmail}
      />
    );
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to show dashboard currently." />;
  }
};

export default HomePage;
