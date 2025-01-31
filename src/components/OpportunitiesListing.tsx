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
  const uniqueOpportunities: Opportunity[] = [];
  const mappedBrandIds = new Set();
  const countMap: Record<number, number> = {};

  opportunities.forEach((item) => {
    const brandId = item.acf.brand_id;
    if (brandId) {
      countMap[brandId] = (countMap[brandId] || 0) + 1;
    }
  });

  opportunities.forEach((item) => {
    const brandId = item.acf.brand_id;
    if (brandId) {
      item.isBrandCard = countMap[brandId] >= 2;
      if (!mappedBrandIds.has(brandId)) {
        mappedBrandIds.add(brandId);
        uniqueOpportunities.push(item);
      }
    } else {
      item.isBrandCard = false;
      uniqueOpportunities.push(item);
    }
  });

  return (
    <>
      <Grid2 container spacing={2} sx={{ mb: 5 }}>
        {map(uniqueOpportunities, (opportunity) => {
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
