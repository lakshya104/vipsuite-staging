import React from 'react';
import { Box, Grid2 } from '@mui/material';
import { isEmpty } from 'lodash';
import ProductCard from '@/components/ProductCard';
import './ProductList.scss';
import { GetBrandProducts } from '@/libs/api-manager/manager';
import { BrandProduct } from '@/interfaces/brand';
import ErrorFallback from '@/components/ErrorFallback';
import en from '@/helpers/lang';

interface ProductListProps {
  brandId: number;
}
const ProductList: React.FC<ProductListProps> = async ({ brandId }) => {
  if (!brandId) {
    return <ErrorFallback errorMessage={en.products.invalidBrandId} />;
  }
  const brandProducts = await GetBrandProducts(brandId);
  if (!brandProducts || isEmpty(brandProducts)) {
    return <ErrorFallback errorMessage={en.products.noProducts} hideSubtext={true} />;
  }
  return (
    <Box className="product-listing">
      <Grid2 container spacing={2.5}>
        {brandProducts.map((product: BrandProduct) => (
          <Grid2 size={{ xs: 6, sm: 4 }} key={product?.id}>
            <ProductCard data={product} />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default ProductList;
