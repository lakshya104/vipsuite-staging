import React from 'react';
import { cookies } from 'next/headers';
import OpportunityDetailsCard from '@/components/OpportunityDetails';
import { GetSession, GetVipOpportunityDetails } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';
import { getVipId } from '@/helpers/utils';

interface OpportunityDetailsPageProps {
  id: number;
}

const OpportunityDetailsPage: React.FC<OpportunityDetailsPageProps> = async ({ id }) => {
  if (!id) {
    return <ErrorFallback errorMessage="Opportunity ID is invalid." />;
  }
  const cookieStore = cookies();
  const userId = cookieStore.get('vipId');
  try {
    const session = await GetSession();
    const { token, role } = session;
    const vipId = getVipId(role, userId, session);
    if (!vipId) {
      return <ErrorFallback errorMessage="VIP ID not found." />;
    }
    const opportunityDetails = await GetVipOpportunityDetails(Number(id), token, vipId);
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
