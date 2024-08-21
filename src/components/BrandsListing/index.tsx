import React from 'react';
import { Grid } from '@mui/material';
import BrandCard from './BrandCard';
import { Brand } from '@/interfaces/brand';

interface BrandsListingProps {
  brands: Brand[];
}

const BrandsListing: React.FC<BrandsListingProps> = ({ brands }) => {
  return (
    <Grid className="landing-product" container spacing={2.5}>
      {brands.map((item) => (
        <Grid item xs={12} sm={6} lg={4} key={item.id} className="landing-product__item">
          <BrandCard item={item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default BrandsListing;
