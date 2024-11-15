import React from 'react';
import { GetAllVips } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';
import MyVipsListing from '@/components/MyVipsListing';
import { MyVips } from '@/interfaces';
import { isEmpty } from 'lodash';

const MyVipPage = async () => {
  try {
    const myVips: MyVips[] = await GetAllVips();
    if (!myVips || isEmpty(myVips)) {
      return (
        <ErrorFallback
          errorMessage="Your VIP list is currently empty. Please consider adding someone to it."
          hideSubtext={true}
        />
      );
    }
    return <MyVipsListing myVips={myVips} />;
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Unable to load your VIP list at the moment." />;
  }
};

export default MyVipPage;
