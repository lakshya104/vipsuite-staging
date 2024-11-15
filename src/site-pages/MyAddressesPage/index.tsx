import React from 'react';
import { GetAddresses } from '@/libs/api-manager/manager';
import { Address } from '@/interfaces';
import AddressListing from '@/components/AddressListing';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';

const MyAddressesPage = async () => {
  try {
    const addresses: Address[] = await GetAddresses();
    if (!addresses || addresses.length === 0) {
      return <ErrorFallback errorMessage="No Address found" hideSubtext={true} />;
    }
    return <AddressListing addresses={addresses} />;
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to show your addresses currently." />;
  }
};

export default MyAddressesPage;
