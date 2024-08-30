import React from 'react';
import { GetAddresses, GetLoginUserId, GetToken } from '@/libs/api-manager/manager';
import { Address } from '@/interfaces';
import AddressForm from '@/features/AddressForm';
import { get } from 'lodash';
import ErrorToaster from '@/components/ErrorToaster';

interface EditAddressPageProps {
  id: number;
}
const EditAddressPage: React.FC<EditAddressPageProps> = async ({ id }) => {
  let addresses: Address[] = [];
  const userId = await GetLoginUserId();
  const token = await GetToken();
  try {
    addresses = await GetAddresses(userId);
  } catch (error) {
    const message = get(error, 'message', '');
    if ((message as string) === 'Expired token') {
      return <ErrorToaster message="Please login again to continue" login={true} errorMessage={String(error)} />;
    } else {
      return <ErrorToaster message="Address not found" errorMessage={String(error)} />;
    }
  }
  const defaultValues: Address = addresses[id - 1];
  return <AddressForm userId={userId} token={token} defaultValues={defaultValues} addressId={id} />;
};

export default EditAddressPage;
