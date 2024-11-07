import React from 'react';
import { FetchCartItems, GetAddresses } from '@/libs/api-manager/manager';
import { Address } from '@/interfaces';
import OrderJourney from '@/features/OrderJourney';

const BasketPage = async () => {
  const [fetchedAddresses, cartData] = await Promise.all([GetAddresses(), FetchCartItems()]);
  const addresses: Address[] = fetchedAddresses;
  return <OrderJourney addresses={addresses} cartData={cartData} />;
};

export default BasketPage;
