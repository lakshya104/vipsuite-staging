import React from 'react';
import { isEmpty } from 'lodash';
import ReferVIPForm from '@/features/Refer-Vip';
import { GetDashboardContent } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';

const Page = async () => {
  const { data, error } = await GetDashboardContent();
  if (error) {
    return <ErrorHandler error={error} errMessage="Not able to refer VIP currently." />;
  }
  if (!data || isEmpty(data)) {
    return <ErrorFallback errorMessage="Something went wrong." hideSubtext={true} />;
  }
  return <ReferVIPForm dashboardContent={data} />;
};

export default Page;
