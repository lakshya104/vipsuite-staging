import React, { Suspense } from 'react';
import { Box, Container } from '@mui/material';
import ProductsPage from '@/site-pages/ProductsPage';
import ProductsPageLoading from '@/site-pages/ProductsPage/loading';

interface SearchParams {
  page?: string;
}

interface PageProps {
  searchParams: Promise<SearchParams>;
}

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams?.page || '1', 10);
  return (
    <Box className="products">
      <Container>
        <Suspense fallback={<ProductsPageLoading />}>
          <ProductsPage currentPage={page} />
        </Suspense>
      </Container>
    </Box>
  );
}
