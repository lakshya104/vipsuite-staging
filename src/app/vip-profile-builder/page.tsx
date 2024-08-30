import React from 'react';
import { GetProfileBuilderContent, GetProfile, GetToken, GetLoginUserId } from '@/libs/api-manager/manager';
import ProfileBuilder from '@/features/VipProfileBuilder';
import { ProfileBuilderOptions, UserProfile } from '@/interfaces';
import { isUndefined } from 'lodash';
import { Container, Typography } from '@mui/material';

const VIPProfileBuilder = async () => {
  const token = await GetToken();
  const id = await GetLoginUserId();
  const profileBuilderOptions: ProfileBuilderOptions = await GetProfileBuilderContent();
  const profileDetails: UserProfile = await GetProfile(token);

  if (isUndefined(id)) {
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

export default VIPProfileBuilder;
