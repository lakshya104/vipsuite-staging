import React from 'react';
import { Box, Grid } from '@mui/material';
import BrandCard from './BrandCard';
import { Brand, DashboardContent } from '@/interfaces/brand';
import { get, partition } from 'lodash';
import DashboardContentComponent from '../DashboardContent';
import { useCurrentUser } from '@/hooks/useCurrentUser';

interface BrandsListingProps {
  brands: Brand[];
  hideReferCard?: boolean;
  dashboardContent?: DashboardContent | null;
}

const BrandsListing: React.FC<BrandsListingProps> = ({ brands, hideReferCard, dashboardContent }) => {
  const [featuredBrands, nonFeaturedBrands] = partition(brands, (brand) => brand?.acf?.is_featured);
  const user = useCurrentUser();
  const tiktokFollowerCount = get(user, 'acf.tiktok_follower_count', 0);
  const instagramFollowerCount = get(user, 'acf.instagram_follower_count', 0);
  const totalFollowerCount = tiktokFollowerCount + instagramFollowerCount;

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
          {dashboardContent && (
            <Box className="gray-card" display={'flex'} justifyContent={'space-between'} gap={2.5}>
              <DashboardContentComponent dashboardContent={dashboardContent} totalFollowers={totalFollowerCount} />
            </Box>
          )}
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
