import React from 'react';
import { GetAllVips } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import MyVipsListing from '@/components/MyVipsListing';
import { MyVips } from '@/interfaces';

const MyVipPage = async () => {
  const myVips: MyVips[] = await GetAllVips();
  if (!myVips || myVips.length === 0) {
    return (
      <ErrorFallback
        errorMessage="Your VIP list is currently empty. Please consider adding someone to it."
        hideSubtext={true}
      />
    );
  }
  return <MyVipsListing myVips={myVips} />;
};

export default MyVipPage;
