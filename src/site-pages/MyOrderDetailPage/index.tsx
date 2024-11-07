import React from 'react';
import { Box, Typography } from '@mui/material';
import FeedbackForm from '@/features/FeedbackForm';
import { GetOrderById } from '@/libs/api-manager/manager';
import { formatDate, formatString } from '@/helpers/utils';
import ErrorFallback from '@/components/ErrorFallback';
import OrderItem from '@/components/OrderItem';
import { Order } from '@/interfaces';
import { filter, first } from 'lodash';
import InboxHeader from '@/components/InboxHeader/InboxHeader';

interface MyOrderDetailPageProps {
  orderId: number;
}

const MyOrderDetailPage: React.FC<MyOrderDetailPageProps> = async ({ orderId }) => {
  const orderDetail: Order = await GetOrderById(orderId);
  if (!orderDetail) {
    return <ErrorFallback errorMessage="No order details found" />;
  }
  console.log(orderDetail.meta_data, orderDetail.line_items);

  return (
    <>
      <InboxHeader />
      <Box my={2.5}>
        <Typography variant="body1">Order Date: {formatDate(orderDetail?.date_created)}</Typography>
        <Typography variant="body1">Status: {formatString(orderDetail?.status)}</Typography>
      </Box>
      <Box className="order-product__items">
        {orderDetail?.status === 'lookbook-order' && (
          <Typography variant="body1">
            Description: {first(filter(orderDetail?.meta_data, (item) => item.key === 'lookbook_order_data'))?.value}
          </Typography>
        )}
        {orderDetail?.line_items.map((item) => <OrderItem key={item?.id} item={item} />)}
      </Box>
      {!orderDetail?.is_feedback_provided && <FeedbackForm type="order" orderId={orderDetail?.id} />}
    </>
  );
};

export default MyOrderDetailPage;
