import React from 'react';
import { Box, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ProgressBarLink } from './ProgressBar';
import { formatDate, formatString } from '@/helpers/utils';
import { Order } from '@/interfaces';

interface OrderListingProps {
  allOrders: Order[];
}

const OrderListing: React.FC<OrderListingProps> = ({ allOrders }) => {
  return (
    <Box className="order-product__items">
      {allOrders.map((order: Order) => {
        if (order.id) {
          return (
            <ProgressBarLink href={`/my-orders/${order?.id}`} key={order?.id}>
              <Box
                className="order-product__item"
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Box>
                  <Typography gutterBottom variant="h2">
                    Order #{order?.id}
                  </Typography>
                  <Typography variant="body1">Date: {formatDate(order?.date_created)}</Typography>
                  <Typography variant="body1">Status: {formatString(order?.status)}</Typography>
                </Box>
                <ArrowForwardIcon />
              </Box>
            </ProgressBarLink>
          );
        }
      })}
    </Box>
  );
};

export default OrderListing;
