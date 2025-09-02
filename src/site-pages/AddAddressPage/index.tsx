import React from 'react';
import AddressForm from '@/features/AddressForm';
import { GetShippingCountries } from '@/libs/api-manager/manager';
import ErrorHandler from '@/components/ErrorHandler';
import en from '@/helpers/lang';

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
  const { data, error } = await GetShippingCountries();
  if (error) {
    return <ErrorHandler error={error} errMessage={en.address.editErrorMessage} />;
  }
  return <AddressForm defaultValues={defaultValues} shippingCountries={data?.countries} />;
};

export default AddAddressPage;
