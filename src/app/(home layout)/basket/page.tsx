import React, { Suspense } from 'react';
import { Box, Container } from '@mui/material';
import './basket.scss';
import BasketPageLoading from '@/site-pages/BasketPage/loading';
import BasketPage from '@/site-pages/BasketPage';

export default async function Page() {
  return (
    <Box className="basket-page">
      <Container>
        <Suspense fallback={<BasketPageLoading />}>
          <BasketPage />
        </Suspense>
      </Container>
    </Box>
  );
}
