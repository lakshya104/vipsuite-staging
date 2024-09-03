import React from 'react';
import { Box, Grid } from '@mui/material';
import BrandCard from './BrandCard';
import { Brand } from '@/interfaces/brand';
import { partition } from 'lodash';
import ReferCard from '../ReferCard';

interface BrandsListingProps {
  brands: Brand[];
  hideReferCard?: boolean;
}

const BrandsListing: React.FC<BrandsListingProps> = ({ brands, hideReferCard }) => {
  const [featuredBrands, nonFeaturedBrands] = partition(brands, (brand) => brand.acf?.is_featured);
  return (
    <>
      {!hideReferCard ? (
        <>
          <Grid className="landing-product" container spacing={2.5}>
            {featuredBrands.map((item) => (
              <Grid item xs={12} sm={6} lg={4} key={item.id} className="landing-product__item">
                <BrandCard item={item} />
              </Grid>
            ))}
          </Grid>
          <Box className="gray-card" display={'flex'} justifyContent={'space-between'} gap={2.5}>
            <ReferCard
              heading="Refer a VIP"
              text="Lorem ipsum dolor sit amet, sed in posse primis, ius te putant molestie sapientem."
              href="/"
            />
            <ReferCard
              heading="Make a Request"
              text="Lorem ipsum dolor sit amet, sed in posse primis, ius te putant molestie sapientem."
              href="/"
            />
          </Box>{' '}
          <Grid className="landing-product" container spacing={2.5}>
            {nonFeaturedBrands.map((item) => (
              <Grid item xs={12} sm={6} lg={4} key={item.id} className="landing-product__item">
                <BrandCard item={item} />
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Grid className="landing-product" container spacing={2.5}>
          {brands.map((item) => (
            <Grid item xs={12} sm={6} lg={4} key={item.id} className="landing-product__item">
              <BrandCard item={item} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default BrandsListing;
