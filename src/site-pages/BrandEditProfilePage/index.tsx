import React from 'react';
import { GetBrandProfile, GetSignupContent } from '@/libs/api-manager/manager';
import ErrorHandler from '@/components/ErrorHandler';
import BrandEditProfileForm from '@/features/BrandProfileForm';
import { get } from 'lodash';

const BrandEditProfilePage = async () => {
  const [{ data: profileDetails, error }, signupContent] = await Promise.all([GetBrandProfile(), GetSignupContent()]);
  const brandSignupOptions = get(signupContent, 'business_options', ['']);
  if (error) {
    return <ErrorHandler error={error} errMessage="Not able to edit Profile currently." />;
  }
  return (
    <BrandEditProfileForm
      profileDetails={profileDetails?.acf}
      brandId={profileDetails?.profile_id}
      brandSignupOptions={brandSignupOptions}
    />
  );
};

export default BrandEditProfilePage;
