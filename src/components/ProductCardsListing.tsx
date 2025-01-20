import { Box, Grid } from '@mui/material';
import React from 'react';
import MyProductsCard from './DashboardCard/MyProductCard';
import { BrandProduct } from '@/interfaces/brand';
import CustomPagination from './CustomPagination';

interface ProductCardsListingProps {
  products: BrandProduct[];
  currentPage: number;
  totalPages: number;
}

const ProductCardsListing: React.FC<ProductCardsListingProps> = ({ products, currentPage, totalPages }) => {
  return (
    <>
      <Grid className="landing-product" container spacing={2} sx={{ mb: 5 }}>
        {products.map((product) => (
          <Grid className="landing-product__item" item xs={12} sm={6} lg={4} key={product.id}>
            <MyProductsCard data={product} />
          </Grid>
        ))}
      </Grid>
      {totalPages > 1 && (
        <Box className="custom-stepper">
          <CustomPagination currentPage={currentPage} totalPages={totalPages} />
        </Box>
      )}
    </>
  );
};

export default ProductCardsListing;
