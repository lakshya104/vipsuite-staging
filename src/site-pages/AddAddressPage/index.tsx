import React from 'react';
import { GetUserIdAndToken } from '@/libs/api-manager/manager';
import { Address } from '@/interfaces';
import AddressForm from '@/features/AddressForm';
import ErrorHandler from '@/components/ErrorHandler';
import ErrorFallback from '@/components/ErrorFallback';

const AddAddressPage = async () => {
  let id: number | null = null;
  let token: string | null = null;
  try {
    const result = await GetUserIdAndToken();
    ({ id, token } = result);
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Address Page not found." />;
  }
  if (!id || !token) {
    return <ErrorFallback errorMessage="Address Page not found." />;
  }
  const defaultValues: Address = {
    first_name: '',
    last_name: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    country: '',
    phone: '',
    postcode: '',
    company: '',
  };

  return <AddressForm userId={id} token={token} defaultValues={defaultValues} />;
};

export default AddAddressPage;
