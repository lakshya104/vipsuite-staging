import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import ProductCard from '@/components/ProductCard';
import './ProductList.scss';
import { GetBrandProducts } from '@/libs/api-manager/manager';
import { BrandProduct } from '@/interfaces/brand';
import { get } from 'lodash';
import ErrorToaster from '@/components/ErrorToaster';

interface ProductListProps {
  brandId: number;
}
const ProductList: React.FC<ProductListProps> = async ({ brandId }) => {
  let brandProducts = null;

  try {
    brandProducts = await GetBrandProducts(brandId);
  } catch (error) {
    const message = get(error, 'message', '');
    if ((message as string) === 'Expired token') {
      return <ErrorToaster message="Please login again to continue" login={true} errorMessage={String(error)} />;
    } else {
      return <ErrorToaster message="Products not found!" errorMessage={String(error)} />;
    }
  }
  if (!brandProducts) {
    return (
      <Box component={'main'} className="product-detail">
        <Container>
          <Typography className="page-title" variant="h2" component="h1" align="center">
            Products not available currently.
          </Typography>
        </Container>
      </Box>
    );
  }

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
