import React from 'react';
import { GetProfileBuilderContent, GetProfile, GetSession } from '@/libs/api-manager/manager';
import ProfileBuilder from '@/features/VipProfileBuilder';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';

const VipProfileBuilderPage = async () => {
  const [
    session,
    { data: profileBuilderOptions, error: profileContentError },
    { data: profileDetails, error: profileDetailsError },
  ] = await Promise.all([GetSession(), GetProfileBuilderContent(), GetProfile()]);
  if (profileContentError || profileDetailsError) {
    return (
      <ErrorHandler
        error={profileContentError || profileDetailsError}
        errMessage="Not able to edit Profile currently."
      />
    );
  }
  if (!session.profile_id || !profileBuilderOptions) {
    return <ErrorFallback errorMessage="Not able to edit Profile currently." />;
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
