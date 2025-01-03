import React from 'react';
import OpportunityDetailsCard from '@/components/OpportunityDetails';
import { GetVipOpportunityDetails } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';

interface OpportunityDetailsPageProps {
  id: number;
}

const OpportunityDetailsPage: React.FC<OpportunityDetailsPageProps> = async ({ id }) => {
  const { data: opportunityDetails, error } = await GetVipOpportunityDetails(Number(id));
  if (error) {
    return <ErrorHandler error={error} errMessage="Not able to show opportunity details currently." />;
  }
  if (!opportunityDetails) {
    return <ErrorFallback errorMessage="No opportunity details available currently." />;
  }
  return <OpportunityDetailsCard opportunity={opportunityDetails} />;
};

export default OpportunityDetailsPage;
