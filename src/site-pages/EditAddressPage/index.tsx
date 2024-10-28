import React from 'react';
import { GetAddresses } from '@/libs/api-manager/manager';
import { Address } from '@/interfaces';
import AddressForm from '@/features/AddressForm';
import ErrorFallback from '@/components/ErrorFallback';

interface EditAddressPageProps {
  id: string;
}

const EditAddressPage: React.FC<EditAddressPageProps> = async ({ id }) => {
  const addresses: Address[] = await GetAddresses();
  if (!addresses || addresses.length === 0) {
    return <ErrorFallback errorMessage="Editing address not possible at the moment." />;
  }
  const defaultValues: Address = addresses.find((add) => add.unique_id === id) || ({} as Address);

  return <AddressForm defaultValues={defaultValues} addressId={id} />;
};

export default EditAddressPage;
