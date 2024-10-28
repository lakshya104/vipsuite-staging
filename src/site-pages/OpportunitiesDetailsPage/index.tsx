import React from 'react';
import OpportunityDetailsCard from '@/components/OpportunityDetails';
import { GetVipOpportunityDetails } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import { OpportunityDetails } from '@/interfaces/opportunitiesDetails';

interface OpportunityDetailsPageProps {
  id: number;
}

const OpportunityDetailsPage: React.FC<OpportunityDetailsPageProps> = async ({ id }) => {
  const opportunityDetails: OpportunityDetails = await GetVipOpportunityDetails(Number(id));
  if (!opportunityDetails) {
    return <ErrorFallback errorMessage="No opportunity details available currently." />;
  }
  return <OpportunityDetailsCard opportunity={opportunityDetails} />;
};

export default OpportunityDetailsPage;
