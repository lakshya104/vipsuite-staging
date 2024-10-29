import React from 'react';
import { Box, Grid } from '@mui/material';
import { isEmpty } from 'lodash';
import ProductCard from '@/components/ProductCard';
import './ProductList.scss';
import { GetBrandProducts } from '@/libs/api-manager/manager';
import { BrandProduct } from '@/interfaces/brand';
import ErrorFallback from '@/components/ErrorFallback';

interface ProductListProps {
  brandId: number;
}
const ProductList: React.FC<ProductListProps> = async ({ brandId }) => {
  if (!brandId) {
    return <ErrorFallback errorMessage="Brand Id is invalid." />;
  }
  const brandProducts = await GetBrandProducts(brandId);
  if (!brandProducts || isEmpty(brandProducts)) {
    return <ErrorFallback errorMessage="No products available for this brand" hideSubtext={true} />;
  }
  return (
    <Box className="product-listing">
      <Grid container spacing={2.5}>
        {brandProducts.map((product: BrandProduct) => (
          <Grid item xs={6} sm={4} key={product?.id}>
            <ProductCard data={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;
