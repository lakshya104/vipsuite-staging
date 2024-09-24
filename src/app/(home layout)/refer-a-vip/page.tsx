import React from 'react';
import ReferVIPForm from '@/features/Refer-Vip';
import { GetDashboardContent } from '@/libs/api-manager/manager';
import ErrorHandler from '@/components/ErrorHandler';
import ErrorFallback from '@/components/ErrorFallback';
import { DashboardContent, Session } from '@/interfaces';
import { auth } from '@/auth';

const Page = async () => {
  let dashboardContent: DashboardContent | null = null;
  try {
    const session = await auth();
    const token = (session?.user as unknown as Session)?.token;
    const vipId = (session?.user as unknown as Session)?.vip_profile_id;
    dashboardContent = await GetDashboardContent(token, vipId);
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Something went wrong." />;
  }

  if (!dashboardContent || Object(dashboardContent).length === 0) {
    return <ErrorFallback errorMessage="Something went wrong." hideSubtext={true} />;
  }
  return <ReferVIPForm dashboardContent={dashboardContent} />;
};

export default Page;
