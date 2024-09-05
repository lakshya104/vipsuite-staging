import React from 'react';
import { GetAddresses, GetLoginUserId, GetToken } from '@/libs/api-manager/manager';
import { Address } from '@/interfaces';
import AddressListing from '@/components/AddressListing';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';

const MyAddressesPage = async () => {
  let addresses: Address[] | null = null;
  let userId: number | null = null;
  let token: string | null = null;
  try {
    [userId, token] = await Promise.all([GetLoginUserId(), GetToken()]);
    if (!token) {
      return <ErrorFallback errorMessage="Invalid Token or User Id" />;
    }
    addresses = await GetAddresses(userId);
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Address page not available at the moment." />;
  }
  if (!addresses || addresses.length === 0) {
    return <ErrorFallback errorMessage="No Address found" hideSubtext={true} />;
  }
  return <AddressListing addresses={addresses} token={token} vipId={userId} />;
};

export default MyAddressesPage;
