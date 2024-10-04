import React from 'react';
import { cookies } from 'next/headers';
import { GetBrandDetails, GetSession } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';
import { BrandDetails } from '@/interfaces/brand';
import BrandDetailsContainer from '@/components/BrandDetailsContainer';
import { getVipId } from '@/helpers/utils';

interface BrandDetailsPageProps {
  brandId: number;
}

const BrandDetailsPage: React.FC<BrandDetailsPageProps> = async ({ brandId }) => {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get('vipId');
    const session = await GetSession();
    const { token, role } = session;
    const vipId = getVipId(role, userId, session);
    if (!vipId) {
      return <ErrorFallback errorMessage="VIP ID not found." />;
    }
    const brandDetails: BrandDetails = await GetBrandDetails(brandId, token, vipId);
    if (!token) {
      return <ErrorFallback errorMessage="Your token is invalid." />;
    }
    if (!brandDetails) {
      return <ErrorFallback errorMessage="Brand details not available currently." />;
    }
    return <BrandDetailsContainer brandDetails={brandDetails} token={token} vipId={vipId} />;
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Brand details not available currently." />;
  }
};

export default BrandDetailsPage;
