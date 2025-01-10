'use client';
import React from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import { filter, first } from 'lodash';
import he from 'he';
import FeedbackForm from '@/features/FeedbackForm';
import { formatDate, formatEventDates, formatString } from '@/helpers/utils';
import OrderItem from './OrderItem';
import { Order } from '@/interfaces';
import { DefaultImageFallback } from '@/helpers/enums';

interface OrderDetailsContainerProps {
  orderDetail: Order;
}

const OrderDetailsContainer: React.FC<OrderDetailsContainerProps> = ({ orderDetail }) => {
  const orderType = orderDetail?.status === 'rsvp-request' ? 'event' : 'order';
  const orderStatus =
    orderDetail?.status === 'rsvp-request' ? 'rsvp' : orderDetail?.status === 'lookbook-order' ? 'lookbook' : 'product';
  const isInterested =
    orderDetail.status === 'rsvp-request'
      ? orderDetail?.meta_data.find((item) => item.key === 'response')?.value === 'interested'
      : true;
  const response = orderDetail?.meta_data.find((item) => item.key === 'response')?.value;

  return (
    <>
      <Box my={2.5}>
        {orderDetail.status === 'rsvp-request' ? (
          <>
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
        {orderStatus !== 'lookbook' &&
          orderStatus !== 'rsvp' &&
          orderDetail?.line_items.map((item) => <OrderItem key={item?.id} item={item} />)}
        {(orderStatus === 'rsvp' || orderStatus === 'lookbook') && (
          <Box className="order-product__item" display={'flex'}>
            <Image
              height={110}
              width={110}
              style={{ width: '100%', height: '100%' }}
              src={orderDetail?.opportunity?.image?.sizes?.medium || DefaultImageFallback.Placeholder}
              alt={he.decode(orderDetail?.opportunity?.title || 'product-image')}
            />
            <Box>
              <Typography gutterBottom variant="h2">
                {he.decode(orderDetail?.opportunity?.title || '')}
              </Typography>
              {orderDetail?.opportunity?.start_date && (
                <Typography variant="body1">
                  {formatEventDates(orderDetail?.opportunity?.start_date, orderDetail?.opportunity?.end_date)}
                </Typography>
              )}
              {orderDetail?.opportunity?.location && (
                <Typography variant="body1">Location: {orderDetail?.opportunity?.location}</Typography>
              )}
              {orderDetail?.status === 'lookbook-order' && (
                <Typography variant="body1">
                  Description:{' '}
                  {first(filter(orderDetail?.meta_data, (item) => item.key === 'lookbook_order_data'))?.value}
                </Typography>
              )}
            </Box>
          </Box>
        )}
      </Box>
      {!orderDetail?.is_feedback_provided && isInterested && (
        <FeedbackForm type={orderType} orderId={orderDetail?.id} />
      )}
    </>
  );
};

export default OrderDetailsContainer;
