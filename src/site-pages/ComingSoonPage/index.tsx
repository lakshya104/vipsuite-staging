import React from 'react';
import { GetComingSoonData } from '@/libs/api-manager/manager';
import ComingSoon from '@/components/ComingSoon/index';
import ErrorHandler from '@/components/ErrorHandler';
import en from '@/helpers/lang';

const ComingSoonPage = async () => {
  const { data, error } = await GetComingSoonData();
  if (error) {
    return <ErrorHandler error={error} errMessage={en.landingPage.comingSoon.errMessage} />;
  }
  return <ComingSoon comingSoondata={data} />;
};

export default ComingSoonPage;
