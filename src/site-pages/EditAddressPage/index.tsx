import React from 'react';
import { isEmpty } from 'lodash';
import { GetAddresses, GetShippingCountries } from '@/libs/api-manager/manager';
import { Address } from '@/interfaces';
import AddressForm from '@/features/AddressForm';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';
import en from '@/helpers/lang';

interface EditAddressPageProps {
  id: string;
}

const EditAddressPage: React.FC<EditAddressPageProps> = async ({ id }) => {
  const [addressesResult, shippingCountriesResult] = await Promise.all([GetAddresses(), GetShippingCountries()]);
  const { data, error } = addressesResult;
  const { data: shippingCountries, error: shippingCountriesError } = shippingCountriesResult;

  if (error || shippingCountriesError) {
    return <ErrorHandler error={error || shippingCountriesError} errMessage={en.address.editErrorMessage} />;
  }
  if (!data || isEmpty(data)) {
    return <ErrorFallback errorMessage={en.address.editErrorMessage} />;
  }
  const defaultValues: Address = data.find((add: Address) => add.unique_id === id) || ({} as Address);

  return <AddressForm defaultValues={defaultValues} addressId={id} shippingCountries={shippingCountries?.countries} />;
};

export default EditAddressPage;
