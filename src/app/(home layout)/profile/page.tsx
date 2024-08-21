import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import ProfileTabs from '@/components/ProfileTabs';
import './profile.scss';
import { GetProfile, GetToken } from '@/libs/api-manager/manager';
import { calculateAge } from '@/helpers/utils';
import Image from 'next/image';
import ErrorToaster from '@/components/ErrorToaster';
import { get } from 'lodash';

export default async function Page() {
  const token = await GetToken();
  let profileDetails = null;
  try {
    profileDetails = await GetProfile(token);
  } catch (error) {
    const message = get(error, 'message', '');
    if ((message as string) === 'Expired token') {
      return <ErrorToaster message="Please login again to continue" login={true} errorMessage={String(error)} />;
    } else {
      return <ErrorToaster message="Profile not found!" errorMessage={String(error)} />;
    }
  }
  if (!profileDetails) {
    return (
      <Container>
        <Typography align="center" variant="h4" marginTop={5}>
          Profile not found.
        </Typography>
      </Container>
    );
  }
  const age = calculateAge(profileDetails?.acf.date_of_birth);
  return (
    <>
      <Box className="user-profile">
        <Container>
          <Typography className="page-title" variant="h2" align="center">
            Your Profile
          </Typography>

          <Box className="user-profile__info" textAlign={'center'} mb={3}>
            <Image
              src="/img/aiavatar.png"
              width={150}
              height={150}
              alt="User Avtar image"
              style={{ borderRadius: '50%', marginTop: '10px' }}
            />
            <Typography variant="h5" component="h2" fontWeight={500} mb={1}>
              {profileDetails?.name}
            </Typography>
            <Typography variant="body2" mb={2}>
              Age {age} | Female | Married
            </Typography>
            <Button variant="text" size="small">
              Edit Profile
            </Button>
          </Box>
          <Box>
            <ProfileTabs profileData={profileDetails.acf} />
          </Box>
        </Container>
      </Box>
    </>
  );
}
