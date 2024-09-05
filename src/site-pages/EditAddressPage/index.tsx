import React from 'react';
import { GetAddresses, GetLoginUserId, GetToken } from '@/libs/api-manager/manager';
import { Address } from '@/interfaces';
import AddressForm from '@/features/AddressForm';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';

interface EditAddressPageProps {
  id: number;
}
const EditAddressPage: React.FC<EditAddressPageProps> = async ({ id }) => {
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
    return <ErrorHandler error={error} errMessage="Editing address not possible at the moment." />;
  }
  if (!addresses) {
    return <ErrorFallback errorMessage="Editing address not possible at the moment." />;
  }
  const defaultValues: Address = addresses[id - 1];
  return <AddressForm userId={userId} token={token} defaultValues={defaultValues} addressId={id} />;
};

export default EditAddressPage;
