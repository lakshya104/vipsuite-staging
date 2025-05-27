import React from 'react';
import OpportunityDetailsCard from '@/components/OpportunityDetails';
import { GetSession, GetVipOpportunityDetails } from '@/libs/api-manager/manager';
import ErrorHandler from '@/components/ErrorHandler';
import en from '@/helpers/lang';

interface OpportunityDetailsPageProps {
  id: number;
}

const OpportunityDetailsPage: React.FC<OpportunityDetailsPageProps> = async ({ id }) => {
  const [{ data: opportunityDetails, error }, session] = await Promise.all([
    GetVipOpportunityDetails(Number(id)),
    GetSession(),
  ]);
  if (error) {
    return <ErrorHandler error={error} errMessage={en.opportunities.errMessage} />;
  }
  return <OpportunityDetailsCard opportunity={opportunityDetails} userRole={session?.role} />;
};

export default OpportunityDetailsPage;
