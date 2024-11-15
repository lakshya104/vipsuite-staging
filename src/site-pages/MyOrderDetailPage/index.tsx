import React from 'react';
import { GetOrderById } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import { Order } from '@/interfaces';
import ErrorHandler from '@/components/ErrorHandler';
import OrderDetailsContainer from '@/components/OrderDetailsContainer';

interface MyOrderDetailPageProps {
  orderId: number;
}

const MyOrderDetailPage: React.FC<MyOrderDetailPageProps> = async ({ orderId }) => {
  try {
    const orderDetail: Order = await GetOrderById(orderId);
    if (!orderDetail) {
      return <ErrorFallback errorMessage="No order details found" />;
    }

    return <OrderDetailsContainer orderDetail={orderDetail} />;
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to show order details currently." />;
  }
};

export default MyOrderDetailPage;
