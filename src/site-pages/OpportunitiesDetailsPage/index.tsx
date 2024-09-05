import React from 'react';
import OpportunityDetailsCard from '@/components/OpportunityDetails';
import { GetToken, GetVipOpportunityDetails } from '@/libs/api-manager/manager';
import { OpportunityDetails } from '@/interfaces/opportunitiesDetails';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';

interface OpportunityDetailsPageProps {
  id: number;
}

const OpportunityDetailsPage: React.FC<OpportunityDetailsPageProps> = async ({ id }) => {
  if (!id) {
    return <ErrorFallback errorMessage="Opportunity Id is invalid." />;
  }
  let opportunityDetails: OpportunityDetails | null = null;
  let token: string | null = null;
  try {
    token = await GetToken();
    if (!token) {
      return <ErrorFallback errorMessage="Your token is invalid." />;
    }
    opportunityDetails = await GetVipOpportunityDetails(Number(id), token);
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to show opportunities details currently." />;
  }
  if (!opportunityDetails) {
    return <ErrorFallback errorMessage="No opportunities details found" />;
  }
  return <OpportunityDetailsCard opportunity={opportunityDetails} token={token} />;
};

export default OpportunityDetailsPage;
