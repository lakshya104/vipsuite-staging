import React from 'react';
import { GetDashboard } from '@/libs/api-manager/manager';
import DashboardItemsContainer from '@/components/DashboardItemsContainer';
import ErrorHandler from '@/components/ErrorHandler';

const HomePage = async () => {
  const { data, error } = await GetDashboard();
  if (error) {
    return <ErrorHandler error={error} errMessage="Not able to show dashboard content currently." />;
  }
  return <DashboardItemsContainer dashboardData={data} />;
};

export default HomePage;
