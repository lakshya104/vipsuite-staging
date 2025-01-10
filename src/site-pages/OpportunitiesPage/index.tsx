import React from 'react';
import { isUndefined } from 'lodash';
import { GetVipOpportunities } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import OpportunitiesContainer from '@/components/OpportunitiesContainer';
import ErrorHandler from '@/components/ErrorHandler';

const OpportunitiesPage = async ({
  opportunityCategory,
  currentPage,
  search,
}: {
  opportunityCategory?: string;
  currentPage: number;
  search?: string;
}) => {
  const { opportunities, totalOpportunities, totalPages, error } = await GetVipOpportunities(
    currentPage,
    opportunityCategory,
    search,
  );
  if (error) {
    return <ErrorHandler error={error} errMessage="Not able to show opportunities currently." />;
  }
  if (isUndefined(opportunities)) {
    return <ErrorFallback errorMessage="Currently there are no opportunities." hideSubtext={true} />;
  }
  return (
    <OpportunitiesContainer
      opportunitiesData={opportunities}
      totalOpportunities={totalOpportunities}
      totalPages={totalPages}
      currentPage={currentPage}
    />
  );
};

export default OpportunitiesPage;
