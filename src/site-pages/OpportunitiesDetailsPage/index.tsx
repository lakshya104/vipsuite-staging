import React from 'react';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import OpportunityDetailsCard from '@/components/OpportunityDetails';
import { GetSession, GetVipOpportunityDetails } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import { getVipId } from '@/helpers/utils';
import { CookieName } from '@/helpers/enums';

interface OpportunityDetailsPageProps {
  id: number;
}

const OpportunityDetailsPage: React.FC<OpportunityDetailsPageProps> = async ({ id }) => {
  if (!id) {
    notFound();
  }
  const userId = cookies().get(CookieName.VipId);
  const session = await GetSession();
  const { token, role } = session;
  const vipId = getVipId(role, userId, session);
  const opportunityDetails = await GetVipOpportunityDetails(Number(id), token, vipId);
  if (!opportunityDetails) {
    return <ErrorFallback errorMessage="No opportunity details found." />;
  }
  return <OpportunityDetailsCard opportunity={opportunityDetails} token={token} vipId={vipId} />;
};

export default OpportunityDetailsPage;
