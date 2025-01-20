import React from 'react';
import OpportunityDetailsCard from '@/components/OpportunityDetails';
import { GetVipOpportunityDetails } from '@/libs/api-manager/manager';
import ErrorHandler from '@/components/ErrorHandler';
import en from '@/helpers/lang';

interface OpportunityDetailsPageProps {
  id: number;
}

const OpportunityDetailsPage: React.FC<OpportunityDetailsPageProps> = async ({ id }) => {
  const { data: opportunityDetails, error } = await GetVipOpportunityDetails(Number(id));
  if (error) {
    return <ErrorHandler error={error} errMessage={en.opportunities.errMessage} />;
  }
  return <OpportunityDetailsCard opportunity={opportunityDetails} />;
};

export default OpportunityDetailsPage;
