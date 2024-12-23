import React from 'react';
import { isEmpty } from 'lodash';
import ErrorFallback from '@/components/ErrorFallback';
import MakeRequest from '@/features/Make-Request';
import { GetDashboardContent } from '@/libs/api-manager/manager';
import ErrorHandler from '@/components/ErrorHandler';

const Page = async () => {
  const { data: dashboardContent, error } = await GetDashboardContent();
  if (error) {
    return <ErrorHandler error={error} errMessage="Not able to make request currently." />;
  }
  if (!dashboardContent || isEmpty(dashboardContent)) {
    return <ErrorFallback errorMessage="Something went wrong." hideSubtext={true} />;
  }
  return <MakeRequest dashboardContent={dashboardContent} />;
};

export default Page;
