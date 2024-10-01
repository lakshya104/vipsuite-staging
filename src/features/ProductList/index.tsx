import React from 'react';
import { Box, Grid } from '@mui/material';
import ProductCard from '@/components/ProductCard';
import './ProductList.scss';
import { GetBrandProducts } from '@/libs/api-manager/manager';
import { BrandProduct } from '@/interfaces/brand';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';

interface ProductListProps {
  brandId: number;
  token: string;
  vipId: number;
}
const ProductList: React.FC<ProductListProps> = async ({ brandId, token, vipId }) => {
  if (!brandId) {
    return <ErrorFallback errorMessage="Brand Id is invalid." />;
  }
  try {
    const brandProducts = await GetBrandProducts(brandId, token, vipId);
    if (!brandProducts || brandProducts.length === 0) {
      return (
        <ErrorFallback errorMessage="No products available for this brand" hideSubtext={true} smallHeight={true} />
      );
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
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Products are not available currently." />;
  }
};

export default ProductList;
