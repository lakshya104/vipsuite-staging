import React from 'react';
import { Box, Typography } from '@mui/material';
import { filter, first } from 'lodash';
import he from 'he';
import FeedbackForm from '@/features/FeedbackForm';
import { formatDate, formatDateWithoutOrdinal, formatString } from '@/helpers/utils';
import OrderItem from './OrderItem';
import { Order } from '@/interfaces';

interface OrderDetailsContainerProps {
  orderDetail: Order;
}
const OrderDetailsContainer: React.FC<OrderDetailsContainerProps> = ({ orderDetail }) => {
  const orderType = orderDetail.status === 'rsvp-request' ? 'event' : 'order';
  const isInterested =
    orderDetail.status === 'rsvp-request'
      ? orderDetail?.meta_data.find((item) => item.key === 'response')?.value === 'interested'
      : true;

  const response = orderDetail?.meta_data.find((item) => item.key === 'response')?.value;
  return (
    <>
      {/* <InboxHeader />  */}
      <Box my={2.5}>
        {orderDetail.status === 'rsvp-request' ? (
          <>
            {orderDetail?.opportunity && (
              <Typography variant="h5" fontWeight={500} align="left" gutterBottom>
                {he.decode(orderDetail?.opportunity.title)}
              </Typography>
            )}
            {orderDetail?.event && (
              <>
                <Typography variant="h5" fontWeight={500} align="left" gutterBottom>
                  {he.decode(orderDetail?.event.title)}
                </Typography>
                <Box mb={2.5}>
                  <Typography variant="body1">{formatDateWithoutOrdinal(orderDetail?.event.start_date)}</Typography>
                  <Typography variant="body1" gutterBottom>
                    Location: {orderDetail?.event.location}
                  </Typography>
                </Box>
              </>
            )}
            <Typography variant="body1">RSVP Date: {formatDate(orderDetail?.date_created)}</Typography>
            <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
              {response}
            </Typography>
          </>
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
        {orderDetail?.status !== 'lookbook-order' &&
          orderDetail?.line_items.map((item) => <OrderItem key={item?.id} item={item} />)}
      </Box>
      {!orderDetail?.is_feedback_provided && isInterested && (
        <FeedbackForm type={orderType} orderId={orderDetail?.id} />
      )}
    </>
  );
};

export default OrderDetailsContainer;
