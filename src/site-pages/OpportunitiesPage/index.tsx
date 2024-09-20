import React from 'react';
import { GetVipOpportunities } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';
import OpportunitiesContainer from '@/components/OpportunitiesContainer';
import { auth } from '@/auth';
import { Session } from '@/interfaces';

const OpportunitiesPage = async () => {
  try {
    const [session, allOpportunities] = await Promise.all([auth(), GetVipOpportunities()]);
    const token = (session?.user as unknown as Session)?.token;
    const vipId = (session?.user as unknown as Session)?.vip_profile_id;
    if (!token) {
      return <ErrorFallback errorMessage="Your token is invalid." />;
    }
    if (!allOpportunities || allOpportunities.length === 0) {
      return <ErrorFallback errorMessage="Currently there are no opportunities." hideSubtext={true} />;
    }
    return <OpportunitiesContainer opportunitiesData={allOpportunities} token={token} vipId={vipId} />;
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to show opportunities currently." />;
  }
};

export default OpportunitiesPage;
