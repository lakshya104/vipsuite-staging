import React from 'react';
import OpportunitiesCard from '@/components/OpportunitiesCard';
import { GetVipOpportunities } from '@/libs/api-manager/manager';
import { get, map } from 'lodash';
import { Box, Container, Grid, Typography } from '@mui/material';
import { Opportunity } from '@/interfaces/opportunities';
import ErrorToaster from '@/components/ErrorToaster';

const OpportunitiesPage = async () => {
  let allOpportunities: Opportunity[] | null = null;
  try {
    allOpportunities = await GetVipOpportunities();
  } catch (error) {
    const message = get(error, 'message', '');
    if ((message as string) === 'Expired token') {
      return <ErrorToaster message="Please login again to continue" login={true} errorMessage={String(error)} />;
    } else {
      return <ErrorToaster message="Not able to show opportunities currently!" errorMessage={String(error)} />;
    }
  }
  if (!allOpportunities || allOpportunities.length === 0) {
    return (
      <Box className="opportunities">
        <Container>
          <Typography align="center" variant="h6" marginTop={5}>
            Not able to show opportunities currently
          </Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box padding={2}>
      <Grid container spacing={2}>
        {map(allOpportunities, (opportunity) => (
          <Grid item xs={12} sm={6} md={6} key={opportunity.id}>
            <OpportunitiesCard opportunity={opportunity} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OpportunitiesPage;
