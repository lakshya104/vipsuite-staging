import React from 'react';
import { Box, Grid } from '@mui/material';
import ProductCard from '@/components/ProductCard';
import './ProductList.scss';
import { products } from '@/data';

const ProductList = () => {
  return (
    <Box className="product-listing">
      <Grid container spacing={2.5}>
        {products.map((product) => (
          <Grid item xs={6} sm={4} key={product.id}>
            <ProductCard data={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;
