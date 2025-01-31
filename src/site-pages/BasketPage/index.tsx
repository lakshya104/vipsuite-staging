import React from 'react';
import { FetchCartItems, GetAddresses } from '@/libs/api-manager/manager';
import OrderJourney from '@/features/OrderJourney';
import ErrorHandler from '@/components/ErrorHandler';
import en from '@/helpers/lang';

const BasketPage = async () => {
  const [{ data: addresses, error: addressesError }, { data: cartData, error: cartError }] = await Promise.all([
    GetAddresses(),
    FetchCartItems(),
  ]);
  if (addressesError || cartError) {
    return <ErrorHandler error={addressesError || cartError} errMessage={en.basket.errMessage} />;
  }
  return <OrderJourney addresses={addresses} cartData={cartData} />;
};

export default BasketPage;
