import React from 'react';
import { GetAddresses } from '@/libs/api-manager/manager';
import AddressListing from '@/components/AddressListing';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';
import en from '@/helpers/lang';
import { isEmpty } from 'lodash';

const MyAddressesPage = async () => {
  const { data: addresses, error } = await GetAddresses();
  if (error) {
    return <ErrorHandler error={error} errMessage="Not able to show your addresses currently." />;
  }
  if (!addresses || isEmpty(addresses)) {
    return (
      <ErrorFallback
        errorMessage={en.listEmptyMessage.noAddressData}
        hideSubtext={true}
        subtext={en.listEmptyMessage.addItemMessage}
      />
    );
  }
  return <AddressListing addresses={addresses} />;
};

export default MyAddressesPage;
