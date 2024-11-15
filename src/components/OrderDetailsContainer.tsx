import FeedbackForm from '@/features/FeedbackForm';
import { formatDate, formatString } from '@/helpers/utils';
import { Box, Typography } from '@mui/material';
import { filter, first } from 'lodash';
import React from 'react';
import OrderItem from './OrderItem';
import { Order } from '@/interfaces';

interface OrderDetailsContainerProps {
  orderDetail: Order;
}
const OrderDetailsContainer: React.FC<OrderDetailsContainerProps> = ({ orderDetail }) => {
  return (
    <>
      {/* <InboxHeader /> */}
      <Box my={2.5}>
        {orderDetail.status === 'rsvp-request' ? (
          <Typography variant="body1">RSVP Date: {formatDate(orderDetail?.date_created)}</Typography>
        ) : (
          <>
            <Typography variant="body1">Order Date: {formatDate(orderDetail?.date_created)}</Typography>
            <Typography variant="body1">Status: {formatString(orderDetail?.status)}</Typography>
          </>
        )}
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

export default OrderDetailsContainer;
