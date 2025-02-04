import React from 'react';
import { Grid2 } from '@mui/material';
import MyProductsCard from './DashboardCard/MyProductCard';
import { BrandProduct } from '@/interfaces/brand';

interface ProductCardsListingProps {
  products: BrandProduct[];
}

const ProductCardsListing: React.FC<ProductCardsListingProps> = ({ products }) => {
  return (
    <>
      <Grid2 className="landing-product" container spacing={2} sx={{ mb: 5 }}>
        {products.map((product) => (
          <Grid2 className="landing-product__item" size={{ xs: 12, sm: 6, lg: 4 }} key={product.id}>
            <MyProductsCard data={product} />
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};

export default ProductCardsListing;
