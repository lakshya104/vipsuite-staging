import React from 'react';
import { GetVipOpportunities } from '@/libs/api-manager/manager';
import { Opportunity } from '@/interfaces/opportunities';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';
import OpportunitiesContainer from '@/components/OpportunitiesContainer';

const OpportunitiesPage = async () => {
  let allOpportunities: Opportunity[] | null = null;
  try {
    allOpportunities = await GetVipOpportunities();
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to show opportunities currently." />;
  }
  if (!allOpportunities || allOpportunities.length === 0) {
    return <ErrorFallback errorMessage="No opportunities found" hideSubtext={true} />;
  }

  return <OpportunitiesContainer opportunitiesData={allOpportunities} />;
};

export default OpportunitiesPage;
