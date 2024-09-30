import React from 'react';
import { FetchCartItemsAndNonce, GetAddresses } from '@/libs/api-manager/manager';
import { Address, Cart, Session } from '@/interfaces';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';
import OrderJourney from '@/features/OrderJourney';
import { auth } from '@/auth';
import { cookies } from 'next/headers';

interface BasketPageProps {
  isAgent?: boolean;
}

const BasketPage: React.FC<BasketPageProps> = async ({ isAgent }) => {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get('vipId');
    const session = await auth();
    const token = (session?.user as unknown as Session)?.token;
    const vipId = !isAgent ? (session?.user as unknown as Session)?.vip_profile_id : Number(userId?.value);
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
