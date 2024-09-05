import React from 'react';
import { GetProfileBuilderContent, GetProfile, GetToken, GetLoginUserId } from '@/libs/api-manager/manager';
import ProfileBuilder from '@/features/VipProfileBuilder';
import { ProfileBuilderOptions, UserProfile } from '@/interfaces';
import ErrorHandler from '@/components/ErrorHandler';
import ErrorFallback from '@/components/ErrorFallback';

const VipProfileBuilderPage = async () => {
  let token: string | null = null;
  let id: number | null = null;
  let profileBuilderOptions: ProfileBuilderOptions;
  let profileDetails: UserProfile;

  try {
    [token, id, profileBuilderOptions] = await Promise.all([GetToken(), GetLoginUserId(), GetProfileBuilderContent()]);
    if (!token) {
      return <ErrorFallback errorMessage="Your token is invalid." />;
    }
    profileDetails = await GetProfile(token);
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to edit Profile currently." />;
  }

  if (!id || id === undefined) {
    return <ErrorFallback errorMessage="Not able to edit Profile currently." />;
  }

  return (
    <ProfileBuilder
      id={id}
      token={token}
      profileBuilderOptions={profileBuilderOptions}
      profileDetails={profileDetails?.acf}
    />
  );
};

export default VipProfileBuilderPage;
