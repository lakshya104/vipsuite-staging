import React, { Suspense } from 'react';
import { Box, Container, Typography } from '@mui/material';
import '../order.scss';
import MyOrderDetailPage from '@/site-pages/MyOrderDetailPage';
import MyOrderDetailLoading from '@/site-pages/MyOrderDetailPage/loading';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ProgressBarLink } from '@/components/ProgressBar';
import { paths, withSearchParams } from '@/helpers/paths';

export default async function Page(props: {
  params: Promise<{ orderId: number; page: number }>;
  searchParams?: Promise<{ page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const orderId = params['orderId'];
  const page = searchParams?.page;
  return (
    <Box className="user-inbox order-details-page">
      <Container>
        <Typography className="page-title" variant="h2" align="center">
          <ProgressBarLink
            href={withSearchParams(() => paths.root.inbox.getHref(), { isOrderTab: 'true', page: page || 1 })}
            aria-label="Back to Messages"
          >
            <ArrowBackIcon />
          </ProgressBarLink>
        </Typography>
        <Suspense fallback={<MyOrderDetailLoading />}>
          <MyOrderDetailPage orderId={orderId} />
        </Suspense>
      </Container>
    </Box>
  );
}
