import React from 'react';
import { map } from 'lodash';
import { Grid2 } from '@mui/material';
import { Opportunity } from '@/interfaces/opportunities';
import { DefaultImageFallback } from '@/helpers/enums';
import OpportunityCard from './OpportunityCard';

interface OpportunitiesListingProps {
  opportunities: Opportunity[];
}

const OpportunitiesListing: React.FC<OpportunitiesListingProps> = ({ opportunities }) => {
  return (
    <>
      <Grid2 container spacing={2} sx={{ mb: 5 }}>
        {map(opportunities, (opportunity) => {
          const image =
            opportunity?.acf?.featured_image?.sizes?.['vs-container-half'] || DefaultImageFallback.Placeholder;
          return (
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={opportunity?.id}>
              <OpportunityCard image={image} opportunity={opportunity} />
            </Grid2>
          );
        })}
      </Grid2>
    </>
  );
};

export default OpportunitiesListing;
