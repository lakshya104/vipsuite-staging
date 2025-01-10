import React from 'react';
import { map, partition } from 'lodash';
import { Box, Grid } from '@mui/material';
import { Opportunity } from '@/interfaces/opportunities';
import { DefaultImageFallback } from '@/helpers/enums';
import OpportunityCard from './OpportunityCard';
import CustomPagination from './CustomPagination';
import './CustomStepper/CustomStepper.scss';

interface OpportunitiesListingProps {
  opportunities: Opportunity[];
  totalPages: number;
  currentPage: number;
}

const OpportunitiesListing: React.FC<OpportunitiesListingProps> = ({ opportunities, totalPages, currentPage }) => {
  const [featuredOpportunities, nonFeaturedOpportunities] = partition(
    opportunities,
    (opportunity) => opportunity?.acf?.is_featured,
  );
  return (
    <>
      <Grid container spacing={2} sx={{ mb: 5 }}>
        {map(featuredOpportunities, (opportunity) => {
          const image =
            opportunity?.acf?.featured_image?.sizes?.['vs-container-half'] || DefaultImageFallback.Placeholder;
          return (
            <Grid item xs={12} sm={6} md={4} key={opportunity?.id}>
              <OpportunityCard image={image} opportunity={opportunity} isFeatured={true} />
            </Grid>
          );
        })}
        {map(nonFeaturedOpportunities, (opportunity) => {
          const image =
            opportunity?.acf?.featured_image?.sizes?.['vs-container-half'] || DefaultImageFallback.Placeholder;
          return (
            <Grid item xs={12} sm={6} md={4} key={opportunity?.id}>
              <OpportunityCard image={image} opportunity={opportunity} isFeatured={false} />
            </Grid>
          );
        })}
      </Grid>
      {totalPages > 1 && (
        <Box className="custom-stepper">
          <CustomPagination currentPage={currentPage} totalPages={totalPages} />
        </Box>
      )}
    </>
  );
};

export default OpportunitiesListing;
