import React from 'react';
import { GetAddresses } from '@/libs/api-manager/manager';
import { Address } from '@/interfaces';
import AddressListing from '@/components/AddressListing';
import ErrorFallback from '@/components/ErrorFallback';

const MyAddressesPage = async () => {
  const addresses: Address[] = await GetAddresses();
  if (!addresses || addresses.length === 0) {
    return <ErrorFallback errorMessage="No Address found" hideSubtext={true} />;
  }
  return <AddressListing addresses={addresses} />;
};

export default MyAddressesPage;
