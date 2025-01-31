import React, { Suspense } from 'react';
import { Box, Container } from '@mui/material';
import ProductsPage from '@/site-pages/ProductsPage';
import ProductsPageLoading from '@/site-pages/ProductsPage/loading';

export default async function Page() {
  return (
    <Box className="products">
      <Container>
        <Suspense fallback={<ProductsPageLoading />}>
          <ProductsPage />
        </Suspense>
      </Container>
    </Box>
  );
}
