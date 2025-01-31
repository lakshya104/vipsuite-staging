import React from 'react';
import { GetBrandDetails } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import { BrandDetails } from '@/interfaces/brand';
import BrandDetailsContainer from '@/components/BrandDetailsContainer';
import { PostType } from '@/helpers/enums';

interface BrandDetailsPageProps {
  brandId: number;
  type?: PostType;
}

const BrandDetailsPage: React.FC<BrandDetailsPageProps> = async ({ brandId, type }) => {
  const brandDetails: BrandDetails = await GetBrandDetails(brandId, type);
  if (!brandDetails) {
    return <ErrorFallback errorMessage="Brand details not available currently." />;
  }
  return <BrandDetailsContainer brandDetails={brandDetails} type={type} />;
};

export default BrandDetailsPage;
