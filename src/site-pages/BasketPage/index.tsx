import React from 'react';
import { FetchCartItems, GetAddresses } from '@/libs/api-manager/manager';
import { Address } from '@/interfaces';
import OrderJourney from '@/features/OrderJourney';
import ErrorHandler from '@/components/ErrorHandler';

const BasketPage = async () => {
  try {
    const [fetchedAddresses, cartData] = await Promise.all([GetAddresses(), FetchCartItems()]);
    const addresses: Address[] = fetchedAddresses;
    return <OrderJourney addresses={addresses} cartData={cartData} />;
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to show basket contents currently." />;
  }
};

export default BasketPage;
