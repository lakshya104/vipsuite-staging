import React from 'react';
import { isUndefined } from 'lodash';
import { GetVipOpportunities } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import OpportunitiesContainer from '@/components/OpportunitiesContainer';
import { Opportunity } from '@/interfaces/opportunities';
import ErrorHandler from '@/components/ErrorHandler';

const OpportunitiesPage = async () => {
  try {
    const allOpportunities: Opportunity[] = await GetVipOpportunities();
    if (isUndefined(allOpportunities) || allOpportunities.length === 0) {
      return <ErrorFallback errorMessage="Currently there are no opportunities." hideSubtext={true} />;
    }
    return <OpportunitiesContainer opportunitiesData={allOpportunities} />;
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to show opportunities currently." />;
  }
};

export default OpportunitiesPage;
