import React from 'react';
import { cookies } from 'next/headers';
import { auth } from '@/auth';
import { Session } from '@/interfaces';
import { GetVipOpportunities } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';
import OpportunitiesContainer from '@/components/OpportunitiesContainer';

interface OpportunitiesPageProps {
  isAgent?: boolean;
}

const OpportunitiesPage: React.FC<OpportunitiesPageProps> = async ({ isAgent }) => {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get('vipId');
    const session = await auth();
    const token = (session?.user as unknown as Session)?.token;
    const vipId = !isAgent ? (session?.user as unknown as Session)?.vip_profile_id : Number(userId?.value);
    const allOpportunities = await GetVipOpportunities(token, vipId);

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
