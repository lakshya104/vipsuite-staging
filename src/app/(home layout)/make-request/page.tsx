import React from 'react';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';
import MakeRequest from '@/features/Make-Request';
import { DashboardContent } from '@/interfaces/brand';
import { GetDashboardContent } from '@/libs/api-manager/manager';

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
  return <MakeRequest dashboardContent={dashboardContent} />;
};

export default Page;
