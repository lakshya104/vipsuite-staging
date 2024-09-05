import React from 'react';
import { Typography, Box } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { GetAllOrders } from '@/libs/api-manager/manager';
import { Order } from '@/interfaces';
import { formatDate } from '@/helpers/utils';
import { ProgressBarLink } from '@/components/ProgressBar';
import ErrorHandler from '@/components/ErrorHandler';
import ErrorFallback from '@/components/ErrorFallback';

const MyOrdersPage: React.FC = async () => {
  let allOrders: Order[] | null = null;
  try {
    allOrders = await GetAllOrders();
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to show orders currently." />;
  }
  if (!allOrders || allOrders.length === 0) {
    return <ErrorFallback errorMessage="No orders found" hideSubtext={true} />;
  }
  return (
    <Box className="order-product__items">
      {allOrders.map((order: Order) => (
        <ProgressBarLink href={`/my-orders/${order?.id}`} key={order?.id}>
          <Box className="order-product__item" display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Box>
              <Typography gutterBottom variant="h2">
                Order #{order?.id}
              </Typography>
              <Typography variant="body1">Date: {formatDate(order?.date_created)}</Typography>
              <Typography variant="body1">Status: {order?.status}</Typography>
            </Box>
            <ArrowForwardIcon />
          </Box>
        </ProgressBarLink>
      ))}
    </Box>
  );
};

export default MyOrdersPage;
