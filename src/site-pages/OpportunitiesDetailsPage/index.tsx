import React from 'react';
import { cookies } from 'next/headers';
import { auth } from '@/auth';
import { Session } from '@/interfaces';
import OpportunityDetailsCard from '@/components/OpportunityDetails';
import { GetVipOpportunityDetails } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';

interface OpportunityDetailsPageProps {
  id: number;
  isAgent?: boolean;
}

const OpportunityDetailsPage: React.FC<OpportunityDetailsPageProps> = async ({ id, isAgent }) => {
  if (!id) {
    return <ErrorFallback errorMessage="Opportunity ID is invalid." />;
  }
  const cookieStore = cookies();
  const userId = cookieStore.get('vipId');
  try {
    const session = await auth();
    const token = (session?.user as unknown as Session)?.token;
    const vipId = !isAgent ? (session?.user as unknown as Session)?.vip_profile_id : Number(userId?.value);
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
