import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import ProductList from '@/features/ProductList';

export default function Products() {
  return (
    <Box className="product-list__page">
      <Container>
        <Typography variant="h2" gutterBottom>
          Products
        </Typography>
        <ProductList />
      </Container>
    </Box>
  );
}
