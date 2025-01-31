import React from 'react';
import { BrandDetails } from '@/interfaces/brand';
import { Box, Grid2, Typography } from '@mui/material';
import { map, partition } from 'lodash';
import DetailPageImageContainer from './DetailPageImageContainer';
import BrandOpportunityCard from './DashboardCard/BrandOpportunityCard';
import './EventDetails/EventDetails.scss';
import ArrowBackBtn from './ArrowBackBtn';
import { PostType } from '@/helpers/enums';

interface BrandDetailsContainerProps {
  brandDetails: BrandDetails;
  type?: PostType;
}

const BrandDetailsContainer: React.FC<BrandDetailsContainerProps> = ({ brandDetails, type }) => {
  const [featuredOpportunities, nonFeaturedOpportunities] = partition(
    brandDetails?.associated_posts?.posts,
    (opportunity) => opportunity?.acf?.is_featured,
  );
  const sortedOpportunities = [...featuredOpportunities, ...nonFeaturedOpportunities];

  return (
    <Box className="product-detail" mb={10}>
      <Typography className="page-title" variant="h2" component="h1" align="center">
        <ArrowBackBtn />
        {brandDetails?.title?.rendered}
      </Typography>
      <DetailPageImageContainer item={brandDetails} />
      <Box className="product-detail__content">
        <Typography>{brandDetails?.acf?.short_description}</Typography>
      </Box>
      <Box className="product-list__page">
        <Typography variant="h2" sx={{ marginTop: 3, marginBottom: 3 }}>
          {type === PostType.Opportunity ? 'Opportunities' : type === PostType.Event ? 'Events' : 'Products'}
        </Typography>
        <Grid2 className="landing-product" container spacing={2} sx={{ mb: 5 }}>
          {map(sortedOpportunities, (opportunity) => {
            return (
              <Grid2 className="landing-product__item" size={{ xs: 12, sm: 6, lg: 4 }} key={opportunity.ID}>
                <BrandOpportunityCard opportunity={opportunity} type={type || PostType.Opportunity} />
              </Grid2>
            );
          })}
        </Grid2>
      </Box>
    </Box>
  );
};

export default BrandDetailsContainer;
