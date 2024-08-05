import React, { FC } from 'react';
import { Typography, Container, Box } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import './order.scss';

interface Order {
  id: string;
  date: string;
  status: string;
}

const orders: Order[] = [
  { id: '123456', date: '20/05/2024', status: 'Processing' },
  { id: '123455', date: '19/05/2024', status: 'Processing' },
  { id: '123454', date: '19/04/2024', status: 'Delivered' },
  { id: '123453', date: '13/04/2024', status: 'Delivered' },
  { id: '123452', date: '11/03/2024', status: 'Delivered' },
];

const MyOrders: FC = () => {
  return (
    <>
      <Box className="user-profile">
        <Container>
          <Typography className="page-title" variant="h2" align="center">
            My Orders
          </Typography>

          <Box className="order-product__items">
            {orders.map((order: Order) => (
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
                  <Typography variant="body1">Date: {order.date}</Typography>
                  <Typography variant="body1">Status: {order.status}</Typography>
                </Box>
                <Link href={`/my-orders/${order.id}`}>
                  <ArrowForwardIcon />
                </Link>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default MyOrders;
