import React from 'react';
import ReferVIPForm from '@/features/Refer-Vip';
import { GetDashboardContent } from '@/libs/api-manager/manager';
import ErrorHandler from '@/components/ErrorHandler';
import ErrorFallback from '@/components/ErrorFallback';
import { DashboardContent } from '@/interfaces';

const Page = async () => {
  let dashboardContent: DashboardContent | null = null;
  try {
    dashboardContent = await GetDashboardContent();
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Something went wrong." />;
  }

  if (!dashboardContent || Object(dashboardContent).length === 0) {
    return <ErrorFallback errorMessage="Something went wrong." hideSubtext={true} />;
  }
  return <ReferVIPForm dashboardContent={dashboardContent} />;
};

export default Page;
