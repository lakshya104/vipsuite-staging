import React, { Suspense } from 'react';
import './order.scss';
import { Box, Container, Typography } from '@mui/material';
import MyOrdersLoading from '@/sitePages/MyOrdersPage/loading';
import MyOrdersPage from '@/sitePages/MyOrdersPage';

const MyOrders: React.FC = () => {
  return (
    <Box className="user-profile">
      <Container>
        <Typography className="page-title" variant="h2" align="center">
          My Orders
        </Typography>
        <Suspense fallback={<MyOrdersLoading />}>
          <MyOrdersPage />
        </Suspense>
      </Container>
    </Box>
  );
};

export default MyOrders;
