import React from 'react';
import { cookies } from 'next/headers';
import { GetBrandDetails } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';
import { auth } from '@/auth';
import { Session } from '@/interfaces';
import { BrandDetails } from '@/interfaces/brand';
import BrandDetailsContainer from '@/components/BrandDetailsContainer';

interface BrandDetailsPageProps {
  brandId: number;
  isAgent?: boolean;
}

const BrandDetailsPage: React.FC<BrandDetailsPageProps> = async ({ brandId, isAgent }) => {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get('vipId');
    const session = await auth();
    const token = (session?.user as unknown as Session)?.token;
    const vipId = !isAgent ? (session?.user as unknown as Session)?.vip_profile_id : Number(userId?.value);
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
