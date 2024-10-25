import React from 'react';
import { isUndefined } from 'lodash';
import { GetSession, GetVipOpportunities } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import OpportunitiesContainer from '@/components/OpportunitiesContainer';
import { Opportunity } from '@/interfaces/opportunities';
import { cookies } from 'next/headers';
import { CookieName } from '@/helpers/enums';
import { getVipId } from '@/helpers/utils';

const OpportunitiesPage = async () => {
  const userId = cookies().get(CookieName.VipId);
  const session = await GetSession();
  const { token, role } = session;
  const vipId = getVipId(role, userId, session);
  const allOpportunities: Opportunity[] = await GetVipOpportunities(vipId, token);
  if (isUndefined(allOpportunities) || allOpportunities.length === 0) {
    return <ErrorFallback errorMessage="Currently there are no opportunities." hideSubtext={true} />;
  }
  return <OpportunitiesContainer opportunitiesData={allOpportunities} />;
};

export default OpportunitiesPage;
