import React from 'react';
import { Grid2 } from '@mui/material';
import MyProductsCard from './DashboardCard/MyProductCard';
import { BrandProduct } from '@/interfaces/brand';

interface ProductCardsListingProps {
  products: BrandProduct[];
}

const ProductCardsListing: React.FC<ProductCardsListingProps> = ({ products }) => {
  const uniqueProducts: BrandProduct[] = [];
  const mappedBrandIds = new Set();
  const countMap: Record<number, number> = {};

  products.forEach((item) => {
    const brandId = item.brand_id;
    if (brandId) {
      countMap[brandId] = (countMap[brandId] || 0) + 1;
    }
  });

  products.forEach((item) => {
    const brandId = item.brand_id;
    if (brandId) {
      item.isBrandCard = countMap[brandId] >= 2;
      if (!mappedBrandIds.has(brandId)) {
        mappedBrandIds.add(brandId);
        uniqueProducts.push(item);
      }
    } else {
      item.isBrandCard = false;
      uniqueProducts.push(item);
    }
  });

  return (
    <>
      <Grid2 className="landing-product" container spacing={2} sx={{ mb: 5 }}>
        {uniqueProducts.map((product) => (
          <Grid2 className="landing-product__item" size={{ xs: 12, sm: 6, lg: 4 }} key={product.id}>
            <MyProductsCard data={product} />
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};

export default ProductCardsListing;
