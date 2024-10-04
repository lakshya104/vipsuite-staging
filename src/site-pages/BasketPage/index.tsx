import React from 'react';
import { cookies } from 'next/headers';
import { FetchCartItemsAndNonce, GetAddresses, GetSession } from '@/libs/api-manager/manager';
import { Address, Cart } from '@/interfaces';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';
import OrderJourney from '@/features/OrderJourney';
import { getVipId } from '@/helpers/utils';

const BasketPage = async () => {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get('vipId');
    const session = await GetSession();
    const { token, role } = session;
    const vipId = getVipId(role, userId, session);
    if (!vipId) {
      return <ErrorFallback errorMessage="VIP ID not found." />;
    }
    const [fetchedAddresses, cartData] = await Promise.all([GetAddresses(token, vipId), FetchCartItemsAndNonce(token)]);
    if (!cartData || !fetchedAddresses) {
      return <ErrorFallback errorMessage="Not able to process order currently." />;
    }
    const addresses: Address[] = fetchedAddresses;
    const cartItems: Cart = cartData?.items;
    const nonce = cartData?.nonce;
    if (!cartItems || !nonce) {
      return <ErrorFallback errorMessage="Not able to process order currently." />;
    }
    return <OrderJourney addresses={addresses} token={token} cartData={cartItems} nonce={nonce} />;
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to show orders currently." />;
  }
};

export default BasketPage;
