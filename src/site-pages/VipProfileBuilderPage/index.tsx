import React from 'react';
import { GetProfileBuilderContent, GetProfile, GetToken, GetLoginUserId } from '@/libs/api-manager/manager';
import ProfileBuilder from '@/features/VipProfileBuilder';
import { UserProfile } from '@/interfaces';
import ErrorFallback from '@/components/ErrorFallback';
import BackToHome from '@/components/BackToHome';

const VipProfileBuilderPage = async () => {
  const [token, id, profileBuilderOptions] = await Promise.all([
    GetToken(),
    GetLoginUserId(),
    GetProfileBuilderContent(),
  ]);
  const profileDetails: UserProfile = await GetProfile();
  if (!id || id === undefined) {
    return <ErrorFallback errorMessage="Not able to edit Profile currently." />;
  }
  return (
    <>
      {profileDetails?.acf?.profile_status === 'approved' && <BackToHome />}
      <ProfileBuilder
        id={id}
        token={token}
        profileBuilderOptions={profileBuilderOptions}
        profileDetails={profileDetails?.acf}
      />
    </>
  );
};

export default VipProfileBuilderPage;
