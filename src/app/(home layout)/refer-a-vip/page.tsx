import React from 'react';
import ReferVIPForm from '@/features/Refer-Vip';
import { GetDashboardContent } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import { DashboardContent } from '@/interfaces';

const Page = async () => {
  const dashboardContent: DashboardContent =await GetDashboardContent();
  if (!dashboardContent || Object(dashboardContent).length === 0) {
    return <ErrorFallback errorMessage="Something went wrong." hideSubtext={true} />;
  }
  return <ReferVIPForm dashboardContent={dashboardContent} />;
};

export default Page;
