import React from 'react';
import { GetAllOrders, GetNonce } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import OrderListing from '@/components/OrderListing';
import { getAuthData } from '@/libs/actions';

const MyOrdersPage = async () => {
  const { token, vipId } = await getAuthData();
  const nonce = await GetNonce(token);
  const allOrders = await GetAllOrders(token, vipId, nonce);
  if (!allOrders || allOrders.length === 0) {
    return <ErrorFallback errorMessage="No orders found" hideSubtext={true} />;
  }
  return <OrderListing allOrders={allOrders} />;
};

export default MyOrdersPage;
