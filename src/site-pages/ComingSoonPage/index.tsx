import React from 'react';
import { GetComingSoonData } from '@/libs/api-manager/manager';
import ComingSoon from '@/components/ComingSoon/index';
import ErrorHandler from '@/components/ErrorHandler';

const ComingSoonPage = async () => {
  const { data, error } = await GetComingSoonData();
  if (error) {
    return <ErrorHandler error={error} errMessage="Not able to load Coming soon page currently." />;
  }
  return <ComingSoon comingSoondata={data} />;
};

export default ComingSoonPage;
