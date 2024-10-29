import React from 'react';
import { GetAllOrders, GetNonce } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import OrderListing from '@/components/OrderListing';
import { isEmpty } from 'lodash';

const MyOrdersPage = async () => {
  const nonce = await GetNonce();
  const allOrders = await GetAllOrders(nonce);
  if (!allOrders || isEmpty(allOrders)) {
    return <ErrorFallback errorMessage="No orders found" hideSubtext={true} />;
  }
  return <OrderListing allOrders={allOrders} />;
};

export default MyOrdersPage;
