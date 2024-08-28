import React from 'react';
import BasketCard from '@/components/BasketCard';
import { GetVipCart } from '@/libs/api-manager/manager';

const BasketPage = async () => {
  const cartData = await GetVipCart();
  return <BasketCard cartData={cartData} />;
};

export default BasketPage;
