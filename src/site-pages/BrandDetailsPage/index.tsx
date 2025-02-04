import React from 'react';
import { GetBrandDetails } from '@/libs/api-manager/manager';
import BrandDetailsContainer from '@/components/BrandDetailsContainer';
import { PostType } from '@/helpers/enums';
import ErrorHandler from '@/components/ErrorHandler';
import en from '@/helpers/lang';

interface BrandDetailsPageProps {
  brandId: number;
  type?: PostType;
}

const BrandDetailsPage: React.FC<BrandDetailsPageProps> = async ({ brandId, type }) => {
  const { data, error } = await GetBrandDetails(brandId, type);
  if (error) {
    return <ErrorHandler error={error} errMessage={en.brandDetails.errMessage} />;
  }
  return <BrandDetailsContainer brandDetails={data} type={type} />;
};

export default BrandDetailsPage;
