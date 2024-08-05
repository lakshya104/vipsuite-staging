import React, { FC } from 'react';
import { Toolbar, Typography, Container, Divider, Box } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';

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
      <Toolbar>
        <Typography fontWeight="500" sx={{ flexGrow: 1, textAlign: 'center', fontSize: { xs: '14px', md: '22px' } }}>
          My Orders
        </Typography>
      </Toolbar>
      <Container>
        {orders.map((order: Order) => (
          <Box key={order.id} sx={{ my: 2 }}>
            <Box display="flex" sx={{ py: 2, minHeight: '85px' }} justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="body1" fontSize="13px" fontWeight="500">
                  Order #{order.id}
                </Typography>
                <Typography variant="body2" fontSize="12px" color="#494947">
                  Date: {order.date}
                </Typography>
                <Typography variant="body2" fontSize="12px" color="#494947">
                  Status: {order.status}
                </Typography>
              </Box>
              <Link href={`/my-orders/${order.id}`}>
                <ArrowForwardIcon sx={{ color: 'black' }} />
              </Link>
            </Box>
            <Divider />
          </Box>
        ))}
      </Container>
    </>
  );
};

export default MyOrders;
