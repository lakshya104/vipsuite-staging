import { Box, Container, Typography } from '@mui/material';
import React, { Suspense } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../order.scss';
import { ProgressBarLink } from '@/components/ProgressBar';
import MyOrderDetailPage from '@/pages/MyOrderDetailPage';
import MyOrderDetailLoading from '@/pages/MyOrderDetailPage/loading';

export default async function OrderPage({ params }: { params: { orderId: number } }) {
  const orderId = params['orderId'];

  return (
    <Box className="user-profile order-details-page">
      <Container>
        <Typography className="page-title" variant="h2" align="center">
          <ProgressBarLink href={'/my-orders'} aria-label="Back to My Orders">
            <ArrowBackIcon />
          </ProgressBarLink>
          Order #{orderId}
        </Typography>
        <Suspense fallback={<MyOrderDetailLoading />}>
          <MyOrderDetailPage orderId={orderId} />
        </Suspense>
      </Container>
    </Box>
  );
}
