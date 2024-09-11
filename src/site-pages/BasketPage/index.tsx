import React from 'react';
import { FetchCartItemsAndNonce, GetAddresses, GetCustomerIdTokenAndUserId } from '@/libs/api-manager/manager';
import { Address, Cart } from '@/interfaces';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';
import OrderJourney from '@/features/OrderJourney';

const BasketPage = async () => {
  let addresses: Address[] | [] = [];
  let id: number | null = null;
  let token: string | null = null;
  let userId: number | null = null;
  let cartItems: Cart | null = null;
  let nonce: string | null = null;
  try {
    const customerData = await GetCustomerIdTokenAndUserId();
    id = customerData?.id;
    token = customerData?.token;
    userId = customerData?.userId;
    const [fetchedAddresses, cartData] = await Promise.all([GetAddresses(userId), FetchCartItemsAndNonce(token)]);
    if (!cartData || !fetchedAddresses) {
      return <ErrorFallback errorMessage="Not able to process order currently." />;
    }
    addresses = fetchedAddresses;
    cartItems = cartData.items;
    nonce = cartData.nonce;
    if (!cartItems || !nonce) {
      return <ErrorFallback errorMessage="Not able to process order currently." />;
    }
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to show orders currently." />;
  }

  return <OrderJourney addresses={addresses} token={token} customerId={id} cartData={cartItems} nonce={nonce} />;
};

export default BasketPage;
