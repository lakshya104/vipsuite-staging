import React from 'react';
import { GetOrderById } from '@/libs/api-manager/manager';
import ErrorHandler from '@/components/ErrorHandler';
import OrderDetailsContainer from '@/components/OrderDetailsContainer';
import en from '@/helpers/lang';

interface MyOrderDetailPageProps {
  orderId: number;
}

const MyOrderDetailPage: React.FC<MyOrderDetailPageProps> = async ({ orderId }) => {
  const { data: orderDetail, error } = await GetOrderById(orderId);
  if (error) {
    return <ErrorHandler error={error} errMessage={en.myOrders.errMessage} />;
  }
  return <OrderDetailsContainer orderDetail={orderDetail} />;
};

export default MyOrderDetailPage;
