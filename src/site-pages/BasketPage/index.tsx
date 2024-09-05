import React from 'react';
import BasketCard from '@/components/BasketCard';
import { GetToken, GetVipCart } from '@/libs/api-manager/manager';
import { Cart } from '@/interfaces';
import ErrorHandler from '@/components/ErrorHandler';
import ErrorFallback from '@/components/ErrorFallback';

const BasketPage = async () => {
  let cartData: Cart | null = null;
  let token = null;
  try {
    token = await GetToken();
    if (!token) {
      return <ErrorFallback errorMessage="Your token is invalid." />;
    }
    cartData = await GetVipCart();
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Basket items are currently not available." />;
  }
  if (!cartData) {
    return <ErrorFallback errorMessage="Your cart is Empty." hideSubtext={true} />;
  }
  return <BasketCard cartData={cartData} token={token} />;
};

export default BasketPage;
