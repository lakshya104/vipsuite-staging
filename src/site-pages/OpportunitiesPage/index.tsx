import React from 'react';
import { GetOpportunityCategory, GetVipOpportunities } from '@/libs/api-manager/manager';
import OpportunitiesContainer from '@/components/OpportunitiesContainer';
import ErrorHandler from '@/components/ErrorHandler';
import en from '@/helpers/lang';

const OpportunitiesPage = async ({
  opportunityCategory,
  search,
}: {
  opportunityCategory?: string;
  search?: string;
}) => {
  const { opportunities, error } = await GetVipOpportunities(opportunityCategory, search);
  const categories = await GetOpportunityCategory();
  if (error) {
    return <ErrorHandler error={error} errMessage={en.opportunities.listingErrMessage} />;
  }
  return <OpportunitiesContainer opportunitiesData={opportunities} categories={categories} />;
};

export default OpportunitiesPage;
