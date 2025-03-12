import React from 'react';
import { GetDashboard } from '@/libs/api-manager/manager';
import DashboardItemsContainer from '@/components/DashboardItemsContainer';
import ErrorHandler from '@/components/ErrorHandler';
import en from '@/helpers/lang';

const HomePage = async () => {
  const { data, error } = await GetDashboard();
  if (error) {
    return <ErrorHandler error={error} errMessage={en.homePage.errMessage} />;
  }
  return <DashboardItemsContainer dashboardData={data} />;
};

export default HomePage;
