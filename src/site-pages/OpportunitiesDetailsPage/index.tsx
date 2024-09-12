import React from 'react';
import OpportunityDetailsCard from '@/components/OpportunityDetails';
import { GetVipOpportunityDetails } from '@/libs/api-manager/manager';
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
  try {
    opportunityDetails = await GetVipOpportunityDetails(Number(id));
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to show opportunities details currently." />;
  }
  if (!opportunityDetails) {
    return <ErrorFallback errorMessage="No opportunities details found" />;
  }
  return <OpportunityDetailsCard opportunity={opportunityDetails} />;
};

export default OpportunityDetailsPage;
