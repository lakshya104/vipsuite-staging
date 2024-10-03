import React from 'react';
import { GetProfileBuilderContent, GetProfile, GetToken, GetLoginUserId } from '@/libs/api-manager/manager';
import ProfileBuilder from '@/features/VipProfileBuilder';
import { UserProfile } from '@/interfaces';
import ErrorHandler from '@/components/ErrorHandler';
import ErrorFallback from '@/components/ErrorFallback';
import BackToHome from '@/components/BackToHome';

const VipProfileBuilderPage = async () => {
  try {
    const [token, id, profileBuilderOptions] = await Promise.all([
      GetToken(),
      GetLoginUserId(),
      GetProfileBuilderContent(),
    ]);
    if (!token) {
      return <ErrorFallback errorMessage="Your token is invalid." />;
    }
    const profileDetails: UserProfile = await GetProfile(token);
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
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to edit Profile currently." />;
  }
};

export default VipProfileBuilderPage;
