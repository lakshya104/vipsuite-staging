import React from 'react';
import { GetBrandDetails } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import { BrandDetails } from '@/interfaces/brand';
import BrandDetailsContainer from '@/components/BrandDetailsContainer';

interface BrandDetailsPageProps {
  brandId: number;
}

const BrandDetailsPage: React.FC<BrandDetailsPageProps> = async ({ brandId }) => {
  const brandDetails: BrandDetails = await GetBrandDetails(brandId);
  if (!brandDetails) {
    return <ErrorFallback errorMessage="Brand details not available currently." />;
  }
  return <BrandDetailsContainer brandDetails={brandDetails} />;
};

export default BrandDetailsPage;
