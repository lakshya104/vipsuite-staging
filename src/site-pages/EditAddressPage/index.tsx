import React from 'react';
import { isEmpty } from 'lodash';
import { GetAddresses } from '@/libs/api-manager/manager';
import { Address } from '@/interfaces';
import AddressForm from '@/features/AddressForm';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';

interface EditAddressPageProps {
  id: string;
}

const EditAddressPage: React.FC<EditAddressPageProps> = async ({ id }) => {
  const { data, error } = await GetAddresses();
  if (error) {
    return <ErrorHandler error={error} errMessage="Not able to edit address currently." />;
  }
  if (!data || isEmpty(data)) {
    return <ErrorFallback errorMessage="Editing address not possible at the moment." />;
  }
  const defaultValues: Address = data.find((add: Address) => add.unique_id === id) || ({} as Address);

  return <AddressForm defaultValues={defaultValues} addressId={id} />;
};

export default EditAddressPage;
