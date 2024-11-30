import React, { Suspense } from 'react';
import { Box, Container, Typography } from '@mui/material';
import '../order.scss';
import MyOrderDetailPage from '@/site-pages/MyOrderDetailPage';
import MyOrderDetailLoading from '@/site-pages/MyOrderDetailPage/loading';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ProgressBarLink } from '@/components/ProgressBar';

export default async function Page({
  params,
  searchParams,
}: {
  params: { orderId: number; page: number };
  searchParams?: { page?: string };
}) {
  const orderId = params['orderId'];
  const page = searchParams?.page;
  return (
    <Box className="user-inbox order-details-page">
      <Container>
        <Typography className="page-title" variant="h2" align="center">
          <ProgressBarLink href={`/inbox?isOrderTab=true&page=${page || 1}`} aria-label="Back to Messages">
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
