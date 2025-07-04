import React from 'react';
import { GetProfile, GetSession, GetProfileBuilder } from '@/libs/api-manager/manager';
import ProfileBuilder from '@/features/VipProfileBuilder';
import ErrorHandler from '@/components/ErrorHandler';
import en from '@/helpers/lang';

const VipProfileBuilderPage = async () => {
  const [
    session,
    { data: profileDetails, error: profileDetailsError },
    { data: profileBuilderData, error: profileBuilderError },
  ] = await Promise.all([GetSession(), GetProfile(), GetProfileBuilder()]);
  if (profileDetailsError || profileBuilderError) {
    return (
      <ErrorHandler error={profileDetailsError || profileBuilderError} errMessage={en.vipProfileBuilder.errMessage} />
    );
  }

  return (
    <ProfileBuilder
      id={session.profile_id}
      profileDetails={profileDetails?.acf}
      token={session.token}
      profileBuilderData={profileBuilderData}
    />
  );
};

export default VipProfileBuilderPage;
