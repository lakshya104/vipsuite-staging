import React from 'react';
import { Box, Typography } from '@mui/material';
import FeedbackForm from '@/features/FeedbackForm';
import { GetOrderById, GetUserIdAndToken } from '@/libs/api-manager/manager';
import { formatDate } from '@/helpers/utils';
import ErrorHandler from '@/components/ErrorHandler';
import ErrorFallback from '@/components/ErrorFallback';
import OrderItem from '@/components/OrderItem';
import { Order } from '@/interfaces';

interface MyOrderDetailPageProps {
  orderId: number;
}

const MyOrderDetailPage: React.FC<MyOrderDetailPageProps> = async ({ orderId }) => {
  let orderDetail: Order | null = null;
  let id: number | null = null;
  let token: string | null = null;
  try {
    const result = await GetUserIdAndToken();
    ({ id, token } = result);
    if (!token || !id) {
      return <ErrorFallback errorMessage="Your token is invalid." />;
    }
    orderDetail = await GetOrderById(orderId, token);
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to show order details currently." />;
  }
  if (!orderDetail) {
    return <ErrorFallback errorMessage="No order details found" />;
  }
  return (
    <>
      <Box my={2.5}>
        <Typography variant="body1">Order Date: {formatDate(orderDetail?.date_created)}</Typography>
        <Typography variant="body1">Status: {orderDetail?.status}</Typography>
      </Box>
      <Box className="order-product__items">
        {orderDetail?.line_items.map((item) => <OrderItem key={item?.id} item={item} />)}
      </Box>
      {!orderDetail.is_feedback_provided && (
        <FeedbackForm type="order" token={token} vipId={id} orderId={orderDetail?.id} />
      )}
    </>
  );
};

export default MyOrderDetailPage;
