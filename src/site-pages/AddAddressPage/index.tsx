import React from 'react';
import { GetLoginUserId, GetToken } from '@/libs/api-manager/manager';
import { Address } from '@/interfaces';
import AddressForm from '@/features/AddressForm';

const AddAddressPage = async () => {
  const id = await GetLoginUserId();
  const token = await GetToken();

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
