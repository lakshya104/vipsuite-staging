import React from 'react';
import { GetDashboard, GetDashboardContent } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';
import { Session } from '@/interfaces';
import DashboardItemsContainer from '@/components/DashboardItemsContainer';
import { auth } from '@/auth';
import { get } from 'lodash';
import { cookies } from 'next/headers';

interface HomePageProps {
  isAgent?: boolean;
}

const HomePage: React.FC<HomePageProps> = async ({ isAgent }) => {
  const cookieStore = cookies();
  const userId = cookieStore.get('vipId');
  try {
    const session = await auth();
    const token = (session?.user as unknown as Session)?.token;
    const vipId = !isAgent ? (session?.user as unknown as Session)?.vip_profile_id : Number(userId?.value);
    const [dashboardContent, dashboardItems] = await Promise.all([
      GetDashboardContent(token, vipId),
      GetDashboard(token, vipId),
    ]);
    const tiktokFollowerCount = get(session?.user, 'acf.tiktok_follower_count', 0);
    const instagramFollowerCount = get(session?.user, 'acf.instagram_follower_count', 0);
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
        totalFollowerCount={!isAgent ? totalFollowerCount : 0}
      />
    );
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to show dashboard currently." />;
  }
};

export default HomePage;
