import React from 'react';
import AddressForm from '@/features/AddressForm';

const AddAddressPage = async () => {
  const defaultValues = {
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

  return <AddressForm defaultValues={defaultValues} />;
};

export default AddAddressPage;
