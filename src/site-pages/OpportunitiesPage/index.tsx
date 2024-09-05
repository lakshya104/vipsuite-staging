import React from 'react';
import OpportunitiesCard from '@/components/OpportunitiesCard';
import { GetVipOpportunities } from '@/libs/api-manager/manager';
import { map } from 'lodash';
import { Box, Grid } from '@mui/material';
import { Opportunity } from '@/interfaces/opportunities';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';

const OpportunitiesPage = async () => {
  let allOpportunities: Opportunity[] | null = null;
  try {
    allOpportunities = await GetVipOpportunities();
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to show opportunities currently." />;
  }
  if (!allOpportunities || allOpportunities.length === 0) {
    return <ErrorFallback errorMessage="No opportunities found" hideSubtext={true} />;
  }

  return (
    <Box>
      <Grid container spacing={2}>
        {map(allOpportunities, (opportunity) => (
          <Grid item xs={12} sm={6} md={4} key={opportunity.id}>
            <OpportunitiesCard opportunity={opportunity} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OpportunitiesPage;
