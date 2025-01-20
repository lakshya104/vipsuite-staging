import React from 'react';
import { GetVipOpportunities } from '@/libs/api-manager/manager';
import OpportunitiesContainer from '@/components/OpportunitiesContainer';
import ErrorHandler from '@/components/ErrorHandler';
import en from '@/helpers/lang';

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
    return <ErrorHandler error={error} errMessage={en.opportunities.listingErrMessage} />;
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
