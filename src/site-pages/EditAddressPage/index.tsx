import React from 'react';
import { GetAddresses } from '@/libs/api-manager/manager';
import { Address, Session } from '@/interfaces';
import AddressForm from '@/features/AddressForm';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';
import { cookies } from 'next/headers';
import { auth } from '@/auth';

interface EditAddressPageProps {
  id: string;
  isAgent?: boolean;
}

const EditAddressPage: React.FC<EditAddressPageProps> = async ({ id, isAgent }) => {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get('vipId');
    const session = await auth();
    const token = (session?.user as unknown as Session)?.token;
    const vipId = !isAgent ? (session?.user as unknown as Session)?.vip_profile_id : Number(userId?.value);
    if (!userId || !token) {
      return <ErrorFallback errorMessage="Invalid Token or User Id" />;
    }
    const addresses: Address[] = await GetAddresses(token, vipId);
    if (!addresses || addresses.length === 0) {
      return <ErrorFallback errorMessage="Editing address not possible at the moment." />;
    }
    const defaultValues: Address = addresses.find((add) => add.unique_id === id) || ({} as Address);

    return <AddressForm userId={vipId} token={token} defaultValues={defaultValues} addressId={id} />;
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Editing address not possible at the moment." />;
  }
};

export default EditAddressPage;
