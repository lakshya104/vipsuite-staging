import React from 'react';
import { GetProfileBuilderContent, GetProfile, GetLoginUserId } from '@/libs/api-manager/manager';
import ProfileBuilder from '@/features/VipProfileBuilder';
import { UserProfile } from '@/interfaces';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';

const VipProfileBuilderPage = async () => {
  try {
    const [id, profileBuilderOptions] = await Promise.all([GetLoginUserId(), GetProfileBuilderContent()]);
    const profileDetails: UserProfile = await GetProfile();
    if (!id || !profileBuilderOptions) {
      return <ErrorFallback errorMessage="Not able to edit Profile currently." />;
    }
    return (
      <ProfileBuilder id={id} profileBuilderOptions={profileBuilderOptions} profileDetails={profileDetails?.acf} />
    );
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to edit Profile currently." />;
  }
};

export default VipProfileBuilderPage;
