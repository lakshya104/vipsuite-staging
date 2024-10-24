import React from 'react';
import { cookies } from 'next/headers';
import { isUndefined } from 'lodash';
import { GetSession, GetVipOpportunities } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import OpportunitiesContainer from '@/components/OpportunitiesContainer';
import { getVipId } from '@/helpers/utils';
import { CookieName } from '@/helpers/enums';

const OpportunitiesPage = async () => {
    const userId = cookies().get(CookieName.VipId);
    const session = await GetSession();
    const { token, role } = session;
    const vipId = getVipId(role, userId, session);
    const allOpportunities = await GetVipOpportunities(token, vipId);
    if (isUndefined(allOpportunities) || allOpportunities.length === 0) {
      return <ErrorFallback errorMessage="Currently there are no opportunities." hideSubtext={true} />;
    }
    return <OpportunitiesContainer opportunitiesData={allOpportunities} />;
};

export default OpportunitiesPage;
