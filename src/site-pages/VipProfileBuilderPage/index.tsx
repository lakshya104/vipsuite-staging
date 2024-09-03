import React from 'react';
import { GetProfileBuilderContent, GetProfile, GetToken, GetLoginUserId } from '@/libs/api-manager/manager';
import ProfileBuilder from '@/features/VipProfileBuilder';
import { ProfileBuilderOptions, UserProfile } from '@/interfaces';
import { get } from 'lodash';
import { Container, Typography } from '@mui/material';
import ErrorToaster from '@/components/ErrorToaster';

const VipProfileBuilderPage = async () => {
  let token: string | null = null;
  let id: number | null = null;
  let profileBuilderOptions: ProfileBuilderOptions;
  let profileDetails: UserProfile;

  try {
    [token, id, profileBuilderOptions] = await Promise.all([GetToken(), GetLoginUserId(), GetProfileBuilderContent()]);
    profileDetails = await GetProfile(token);
  } catch (error) {
    const message = get(error, 'message', '');
    if ((message as string) === 'Expired token') {
      return <ErrorToaster message="Please login again to continue" login={true} errorMessage={String(error)} />;
    }
    return <ErrorToaster message="An error occurred while fetching data" errorMessage={String(error)} />;
  }

  if (id === null || id === undefined) {
    return (
      <Container>
        <Typography className="page-title" variant="h2" align="center">
          Profile Builder not Available at the moment.
        </Typography>
      </Container>
    );
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
