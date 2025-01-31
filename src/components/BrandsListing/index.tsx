import React from 'react';
import { Box, Grid2 } from '@mui/material';
import BrandCard from './BrandCard';
import { Brand } from '@/interfaces/brand';
import { partition } from 'lodash';
// import DashboardContentComponent from '../DashboardContent';
import { DashboardContent } from '@/interfaces';

interface BrandsListingProps {
  brands: Brand[];
  hideReferCard?: boolean;
  dashboardContent?: DashboardContent | null;
}

const BrandsListing: React.FC<BrandsListingProps> = ({ brands, hideReferCard, dashboardContent }) => {
  const [featuredBrands, nonFeaturedBrands] = partition(brands, (brand) => brand?.acf?.is_featured);
  // const totalFollowerCount = 0 + 0;

  return (
    <>
      {!hideReferCard ? (
        <>
          <Grid2 className="landing-product" container spacing={2.5}>
            {featuredBrands.map((item) => (
              <Grid2 size={{ xs: 12, sm: 6, lg: 4 }} key={item.id} className="landing-product__item">
                <BrandCard item={item} />
              </Grid2>
            ))}
          </Grid2>
          {dashboardContent && (
            <Box className="gray-card" display={'flex'} justifyContent={'space-between'} gap={2.5}>
              {/* <DashboardContentComponent dashboardContent={dashboardContent} totalFollowers={totalFollowerCount} /> */}
            </Box>
          )}
          <Grid2 className="landing-product" container spacing={2.5}>
            {nonFeaturedBrands.map((item) => (
              <Grid2 size={{ xs: 12, sm: 6, lg: 4 }} key={item.id} className="landing-product__item">
                <BrandCard item={item} />
              </Grid2>
            ))}
          </Grid2>
        </>
      ) : (
        <Grid2 className="landing-product" container spacing={2.5}>
          {brands.map((item) => (
            <Grid2 size={{ xs: 12, sm: 6, lg: 4 }} key={item.id} className="landing-product__item">
              <BrandCard item={item} />
            </Grid2>
          ))}
        </Grid2>
      )}
    </>
  );
};

export default BrandsListing;
