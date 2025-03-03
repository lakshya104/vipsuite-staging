import React from 'react';
import { GetBrandProfile } from '@/libs/api-manager/manager';
import ErrorHandler from '@/components/ErrorHandler';
import BrandEditProfileForm from '@/features/BrandProfileForm';

const BrandEditProfilePage = async () => {
  const { data: profileDetails, error } = await GetBrandProfile();
  if (error) {
    return <ErrorHandler error={error} errMessage="Not able to edit Profile currently." />;
  }
  return <BrandEditProfileForm profileDetails={profileDetails?.acf} brandId={profileDetails?.profile_id} />;
};

export default BrandEditProfilePage;
