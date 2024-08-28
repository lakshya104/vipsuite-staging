import React, { Suspense } from 'react';
import { Box, Container, Typography } from '@mui/material';
import BasketPage from '@/site-pages/BasketPage';

export default async function Page() {
  return (
    <Box className="basket-page">
      <Container>
        <Typography className="page-title" variant="h2" align="center" component="h1">
          Basket
        </Typography>
        <Suspense>
          <BasketPage />
        </Suspense>
      </Container>
    </Box>
  );
}
