import React from 'react';
import { GetProfileBuilderContent, GetProfile, GetToken, GetLoginUserId } from '@/libs/api-manager/manager';
import ProfileBuilder from '@/features/VipProfileBuilder';
import { ProfileBuilderOptions, UserProfile } from '@/interfaces';

const VIPProfileBuilder = async () => {
  const token = await GetToken();
  const id = await GetLoginUserId();
  const profileBuilderOptions: ProfileBuilderOptions = await GetProfileBuilderContent();
  const profileDetails: UserProfile = await GetProfile(token);
  return (
    <ProfileBuilder
      id={id}
      token={token}
      profileBuilderOptions={profileBuilderOptions}
      profileDetails={profileDetails?.acf}
    />
  );
};

export default VIPProfileBuilder;
