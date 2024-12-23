import React from 'react';
import { isUndefined } from 'lodash';
import { GetVipOpportunities } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import OpportunitiesContainer from '@/components/OpportunitiesContainer';
import ErrorHandler from '@/components/ErrorHandler';

const OpportunitiesPage = async ({ opportunityCategory }: { opportunityCategory?: string }) => {
  const { data: allOpportunities, error } = await GetVipOpportunities(opportunityCategory);
  if (error) {
    return <ErrorHandler error={error} errMessage="Not able to show opportunities currently." />;
  }
  if (isUndefined(allOpportunities)) {
    return <ErrorFallback errorMessage="Currently there are no opportunities." hideSubtext={true} />;
  }
  return <OpportunitiesContainer opportunitiesData={allOpportunities} />;
};

export default OpportunitiesPage;
