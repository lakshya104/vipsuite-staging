import React from 'react';
import { cookies } from 'next/headers';
import { GetAddresses, GetSession } from '@/libs/api-manager/manager';
import { Address } from '@/interfaces';
import AddressListing from '@/components/AddressListing';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';
import { getVipId } from '@/helpers/utils';

interface MyAddressesPageProps {
  isAgent?: boolean;
}
const MyAddressesPage: React.FC<MyAddressesPageProps> = async () => {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get('vipId');
    const session = await GetSession();
    const { token, role } = session;
    const vipId = getVipId(role, userId, session);
    if (!vipId) {
      return <ErrorFallback errorMessage="VIP ID not found." />;
    }
    if (!vipId || !token) {
      return <ErrorFallback errorMessage="Invalid Token or User Id" />;
    }
    const addresses: Address[] = await GetAddresses(token, vipId);
    if (!addresses || addresses.length === 0) {
      return <ErrorFallback errorMessage="No Address found" hideSubtext={true} />;
    }
    return <AddressListing addresses={addresses} token={token} vipId={vipId} />;
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Address page not available at the moment." />;
  }
};

export default MyAddressesPage;
