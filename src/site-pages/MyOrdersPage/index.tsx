import React from 'react';
import { Typography, Container, Box } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { GetAllOrders } from '@/libs/api-manager/manager';
import { Order } from '@/interfaces';
import { formatDate } from '@/helpers/utils';
import ErrorToaster from '@/components/ErrorToaster';
import { get } from 'lodash';
import { ProgressBarLink } from '@/components/ProgressBar';

const MyOrdersPage: React.FC = async () => {
  let allOrders: Order[] | null = null;
  try {
    allOrders = await GetAllOrders();
  } catch (error) {
    const message = get(error, 'message', '');
    if ((message as string) === 'Expired token') {
      return <ErrorToaster message="Please login again to continue" login={true} errorMessage={String(error)} />;
    } else {
      return <ErrorToaster message="Orders not found!" errorMessage={String(error)} />;
    }
  }
  if (!allOrders) {
    return (
      <Container>
        <Typography align="center" variant="h4" marginTop={5}>
          Orders not found.
        </Typography>
      </Container>
    );
  }
  return (
    <Box className="order-product__items">
      {allOrders.length > 0 ? (
        allOrders.map((order: Order) => (
          <Box
            className="order-product__item"
            key={order.id}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Box>
              <Typography gutterBottom variant="h2">
                Order #{order.id}
              </Typography>
              <Typography variant="body1">{formatDate(order.date_created)}</Typography>
              <Typography variant="body1">Status: {order.status}</Typography>
            </Box>
            <ProgressBarLink href={`/my-orders/${order.id}`}>
              <ArrowForwardIcon />
            </ProgressBarLink>
          </Box>
        ))
      ) : (
        <Typography variant="body1" my={5} align="center">
          No orders found.
        </Typography>
      )}
    </Box>
  );
};

export default MyOrdersPage;
