import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import ProductCard from '@/components/ProductCard';
import './ProductList.scss';
import { GetBrandProducts } from '@/libs/api-manager/manager';
import { BrandProduct } from '@/interfaces/brand';

const ProductList = async ({ brandId }: { brandId: number }) => {
  const id = brandId;
  const brandProducts = await GetBrandProducts(id);

  return (
    <Box className="product-listing">
      <Grid container spacing={2.5}>
        {brandProducts.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              No products available for this brand.
            </Typography>
          </Grid>
        ) : (
          brandProducts.map((product: BrandProduct) => (
            <Grid item xs={6} sm={4} key={product.id}>
              <ProductCard data={product} />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default ProductList;
