import React from 'react';
import ErrorFallback from '@/components/ErrorFallback';
import MakeRequest from '@/features/Make-Request';
import { GetDashboardContent } from '@/libs/api-manager/manager';
import { DashboardContent } from '@/interfaces';

const Page = async () => {
  const dashboardContent: DashboardContent = await GetDashboardContent();

  if (!dashboardContent || Object(dashboardContent).length === 0) {
    return <ErrorFallback errorMessage="Something went wrong." hideSubtext={true} />;
  }
  return <MakeRequest dashboardContent={dashboardContent} />;
};

export default Page;
