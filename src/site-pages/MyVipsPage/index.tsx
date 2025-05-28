import React from 'react';
import { GetAllVips } from '@/libs/api-manager/manager';
import ErrorHandler from '@/components/ErrorHandler';
import MyVipsListing from '@/components/MyVipsListing';
import AgentHeader from '@/components/Header/AgentHeader';
import en from '@/helpers/lang';

const MyVipPage = async () => {
  const { data: myVips, error } = await GetAllVips();
  if (error) {
    return <ErrorHandler error={error} errMessage={en.myVipsPage.errMessage} />;
  }

  return (
    <>
      <AgentHeader />
      <MyVipsListing myVips={myVips} />
    </>
  );
};

export default MyVipPage;
