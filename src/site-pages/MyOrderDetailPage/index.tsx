import React from 'react';
import { GetOrderById } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';
import OrderDetailsContainer from '@/components/OrderDetailsContainer';
import { isUndefined } from 'lodash';

interface MyOrderDetailPageProps {
  orderId: number;
}

const MyOrderDetailPage: React.FC<MyOrderDetailPageProps> = async ({ orderId }) => {
  const { data: orderDetail, error } = await GetOrderById(orderId);
  if (error) {
    return <ErrorHandler error={error} errMessage="Not able to show order details currently." />;
  }
  if (!orderDetail || isUndefined(orderDetail)) {
    return <ErrorFallback errorMessage="No order details found" />;
  }
  return <OrderDetailsContainer orderDetail={orderDetail} />;
};

export default MyOrderDetailPage;
