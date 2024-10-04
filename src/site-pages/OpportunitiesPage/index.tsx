import React from 'react';
import { cookies } from 'next/headers';
import { GetSession, GetVipOpportunities } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';
import OpportunitiesContainer from '@/components/OpportunitiesContainer';
import { getVipId } from '@/helpers/utils';

const OpportunitiesPage = async () => {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get('vipId');
    const session = await GetSession();
    const { token, role } = session;
    const vipId = getVipId(role, userId, session);
    if (!vipId) {
      return <ErrorFallback errorMessage="VIP ID not found." />;
    }
    const allOpportunities = await GetVipOpportunities(token, vipId);
    if (!token) {
      return <ErrorFallback errorMessage="Your token is invalid." />;
    }
    if (!allOpportunities || allOpportunities.length === 0) {
      return <ErrorFallback errorMessage="Currently there are no opportunities." hideSubtext={true} />;
    }
    return <OpportunitiesContainer opportunitiesData={allOpportunities} />;
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to show opportunities currently." />;
  }
};

export default OpportunitiesPage;
