import React from 'react';
import { GetDashboard, GetDashboardContent } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';
import { Session } from '@/interfaces';
import DashboardItemsContainer from '@/components/DashboardItemsContainer';
import { auth } from '@/auth';
import { get } from 'lodash';

const HomePage = async () => {
  try {
    const [session, dashboardContent, dashboardItems] = await Promise.all([
      auth(),
      GetDashboardContent(),
      GetDashboard(),
    ]);

    const token = (session?.user as unknown as Session)?.token;
    const vipId = (session?.user as unknown as Session)?.vip_profile_id;
    const tiktokFollowerCount = get(session?.user, 'acf.tiktok_follower_count', 0);
    const instagramFollowerCount = get(session?.user, 'acf.instagram_follower_count', 0);
    const totalFollowerCount = tiktokFollowerCount + instagramFollowerCount;

    if (!dashboardItems) {
      return <ErrorFallback errorMessage="Currently there is no dashboard item." hideSubtext={true} />;
    }

    return (
      <DashboardItemsContainer
        dashboardItems={dashboardItems}
        dashboardContent={dashboardContent}
        vipId={vipId}
        token={token}
        totalFollowerCount={totalFollowerCount}
      />
    );
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to show dashboard currently." />;
  }
};

export default HomePage;
