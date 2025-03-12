import React from 'react';
import { GetProfileBuilderContent, GetProfile, GetSession } from '@/libs/api-manager/manager';
import ProfileBuilder from '@/features/VipProfileBuilder';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';
import en from '@/helpers/lang';

const VipProfileBuilderPage = async () => {
  const [
    session,
    { data: profileBuilderOptions, error: profileContentError },
    { data: profileDetails, error: profileDetailsError },
  ] = await Promise.all([GetSession(), GetProfileBuilderContent(), GetProfile()]);
  if (profileContentError || profileDetailsError) {
    return (
      <ErrorHandler error={profileContentError || profileDetailsError} errMessage={en.vipProfileBuilder.errMessage} />
    );
  }
  if (!session.profile_id || !profileBuilderOptions) {
    return <ErrorFallback errorMessage={en.vipProfileBuilder.errMessage} />;
  }
  return (
    <ProfileBuilder
      id={session.profile_id}
      profileBuilderOptions={profileBuilderOptions}
      profileDetails={profileDetails?.acf}
      token={session.token}
    />
  );
};

export default VipProfileBuilderPage;
