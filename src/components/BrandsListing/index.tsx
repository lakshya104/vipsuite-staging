import React from 'react';
import { Grid } from '@mui/material';
import { GetBrands } from '@/libs/api-manager/manager';
import BrandCard from './BrandCard';
import { Brand } from '@/interfaces/brand';

export default async function BrandsListing() {
  const brands: Brand[] = await GetBrands();
  return (
    <Grid className="landing-product" container spacing={2.5}>
      {brands.map((item) => (
        <Grid item xs={12} sm={6} lg={4} key={item.id} className="landing-product__item">
          <BrandCard item={item} />
        </Grid>
      ))}
    </Grid>
  );
}
