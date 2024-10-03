import React from 'react';
import { cookies } from 'next/headers';
import { auth } from '@/auth';
import { GetAddresses } from '@/libs/api-manager/manager';
import { Address, Session } from '@/interfaces';
import AddressListing from '@/components/AddressListing';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';

interface MyAddressesPageProps {
  isAgent?: boolean;
}
const MyAddressesPage: React.FC<MyAddressesPageProps> = async ({ isAgent }) => {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get('vipId');
    const session = await auth();
    const token = (session?.user as unknown as Session)?.token;
    const vipId = !isAgent ? (session?.user as unknown as Session)?.vip_profile_id : Number(userId?.value);
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
