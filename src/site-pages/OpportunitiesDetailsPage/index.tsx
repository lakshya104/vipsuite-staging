import React from 'react';
import OpportunityDetailsCard from '@/components/OpportunityDetails';
import { GetVipOpportunityDetails } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';
import { auth } from '@/auth';
import { Session } from '@/interfaces';

interface OpportunityDetailsPageProps {
  id: number;
}

const OpportunityDetailsPage: React.FC<OpportunityDetailsPageProps> = async ({ id }) => {
  if (!id) {
    return <ErrorFallback errorMessage="Opportunity ID is invalid." />;
  }
  try {
    const [session, opportunityDetails] = await Promise.all([auth(), GetVipOpportunityDetails(Number(id))]);
    const token = (session?.user as unknown as Session)?.token;
    const vipId = (session?.user as unknown as Session)?.vip_profile_id;
    if (!token) {
      return <ErrorFallback errorMessage="Your token is invalid." />;
    }
    if (!opportunityDetails) {
      return <ErrorFallback errorMessage="No opportunity details found." />;
    }
    return <OpportunityDetailsCard opportunity={opportunityDetails} token={token} vipId={vipId} />;
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to show opportunity details currently." />;
  }
};

export default OpportunityDetailsPage;
