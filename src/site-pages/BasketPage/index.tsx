import React from 'react';
import { FetchCartItemsAndNonce, GetAddresses } from '@/libs/api-manager/manager';
import { Address, Cart } from '@/interfaces';
import ErrorFallback from '@/components/ErrorFallback';
import OrderJourney from '@/features/OrderJourney';

const BasketPage = async () => {
  const [fetchedAddresses, cartData] = await Promise.all([GetAddresses(), FetchCartItemsAndNonce()]);
  const addresses: Address[] = fetchedAddresses;
  const cartItems: Cart = cartData?.items;
  const nonce = cartData?.nonce;
  if (!cartItems || !nonce) {
    return <ErrorFallback errorMessage="Not able to process order currently." />;
  }
  return <OrderJourney addresses={addresses} cartData={cartItems} nonce={nonce} />;
};

export default BasketPage;
