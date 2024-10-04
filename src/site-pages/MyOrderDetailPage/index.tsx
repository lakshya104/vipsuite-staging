import React from 'react';
import { cookies } from 'next/headers';
import { Box, Typography } from '@mui/material';
import FeedbackForm from '@/features/FeedbackForm';
import { GetOrderById, GetSession } from '@/libs/api-manager/manager';
import { formatDate, formatString, getVipId } from '@/helpers/utils';
import ErrorHandler from '@/components/ErrorHandler';
import ErrorFallback from '@/components/ErrorFallback';
import OrderItem from '@/components/OrderItem';
import { Order } from '@/interfaces';

interface MyOrderDetailPageProps {
  orderId: number;
}

const MyOrderDetailPage: React.FC<MyOrderDetailPageProps> = async ({ orderId }) => {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get('vipId');
    const session = await GetSession();
    const { token, role } = session;
    const vipId = getVipId(role, userId, session);
    if (!vipId) {
      return <ErrorFallback errorMessage="VIP ID not found." />;
    }
    if (!token || !vipId) {
      return <ErrorFallback errorMessage="Your token is invalid." />;
    }
    const orderDetail: Order = await GetOrderById(orderId, token, vipId);
    if (!orderDetail) {
      return <ErrorFallback errorMessage="No order details found" />;
    }
    return (
      <>
        <Box my={2.5}>
          <Typography variant="body1">Order Date: {formatDate(orderDetail?.date_created)}</Typography>
          <Typography variant="body1">Status: {formatString(orderDetail?.status)}</Typography>
        </Box>
        <Box className="order-product__items">
          {orderDetail?.status === 'lookbook-order' && (
            <Typography variant="body1">Description: {orderDetail?.meta_data[0]?.value}</Typography>
          )}
          {orderDetail?.line_items.map((item) => <OrderItem key={item?.id} item={item} />)}
        </Box>
        {!orderDetail?.is_feedback_provided && (
          <FeedbackForm type="order" token={token} vipId={vipId} orderId={orderDetail?.id} />
        )}
      </>
    );
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to show order details currently." />;
  }
};

export default MyOrderDetailPage;
