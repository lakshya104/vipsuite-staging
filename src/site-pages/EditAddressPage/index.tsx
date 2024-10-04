import React from 'react';
import { cookies } from 'next/headers';
import { GetAddresses, GetSession } from '@/libs/api-manager/manager';
import { Address } from '@/interfaces';
import AddressForm from '@/features/AddressForm';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';
import { getVipId } from '@/helpers/utils';

interface EditAddressPageProps {
  id: string;
}

const EditAddressPage: React.FC<EditAddressPageProps> = async ({ id }) => {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get('vipId');
    const session = await GetSession();
    const { token, role } = session;
    const vipId = getVipId(role, userId, session);
    if (!vipId) {
      return <ErrorFallback errorMessage="VIP ID not found." />;
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
