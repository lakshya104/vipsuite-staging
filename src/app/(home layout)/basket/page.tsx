import React, { Suspense } from 'react';
import { Box, Container, Typography } from '@mui/material';
import BasketPage from '@/site-pages/BasketPage';
import BasketPageLoading from '@/site-pages/BasketPage/loading';

export default async function Page() {
  return (
    <Box className="basket-page">
      <Container>
        <Typography className="page-title" variant="h2" align="center" component="h1" gutterBottom>
          Basket
        </Typography>
        <Suspense fallback={<BasketPageLoading />}>
          <BasketPage />
        </Suspense>
      </Container>
    </Box>
  );
}
