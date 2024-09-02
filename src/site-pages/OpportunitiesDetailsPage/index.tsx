import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import ErrorToaster from '@/components/ErrorToaster';
import { get } from 'lodash';
import OpportunityDetailsCard from '@/components/OpportunityDetails';
import { GetToken, GetVipOpportunityDetails } from '@/libs/api-manager/manager';
import { OpportunityDetails } from '@/interfaces/opportunitiesDetails';

const OpportunityDetailsPage = async ({ id }: { id: number }) => {
  let opportunityDetails: OpportunityDetails | null = null;
  const token = await GetToken();
  try {
    opportunityDetails = await GetVipOpportunityDetails(Number(id), token);
  } catch (error) {
    const message = get(error, 'message', '');
    if ((message as string) === 'Expired token') {
      return <ErrorToaster message="Please login again to continue" login={true} errorMessage={String(error)} />;
    } else {
      return <ErrorToaster message="Opportunity Details not found!" errorMessage={String(error)} />;
    }
  }
  if (!opportunityDetails) {
    return (
      <Box component={'main'} className="product-detail">
        <Container>
          <Typography className="page-title" variant="h2" align="center">
            Opportunity Details not found.
          </Typography>
        </Container>
      </Box>
    );
  }
  return <OpportunityDetailsCard opportunity={opportunityDetails} token={token} />;
};

export default OpportunityDetailsPage;
