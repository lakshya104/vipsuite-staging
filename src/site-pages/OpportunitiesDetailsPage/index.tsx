import React from 'react';
import OpportunityDetailsCard from '@/components/OpportunityDetails';
import { GetSession, GetVipOpportunityDetails } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import { OpportunityDetails } from '@/interfaces/opportunitiesDetails';
import { cookies } from 'next/headers';
import { CookieName } from '@/helpers/enums';
import { getVipId } from '@/helpers/utils';

interface OpportunityDetailsPageProps {
  id: number;
}

const OpportunityDetailsPage: React.FC<OpportunityDetailsPageProps> = async ({ id }) => {
  const userId = cookies().get(CookieName.VipId);
  const session = await GetSession();
  const { token, role } = session;
  const vipId = getVipId(role, userId, session);
  const opportunityDetails: OpportunityDetails = await GetVipOpportunityDetails(Number(id), vipId, token);
  if (!opportunityDetails) {
    return <ErrorFallback errorMessage="No opportunity details available currently." />;
  }
  return <OpportunityDetailsCard opportunity={opportunityDetails} />;
};

export default OpportunityDetailsPage;
