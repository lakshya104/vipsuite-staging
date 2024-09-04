import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import ProfileTabs from '@/components/ProfileTabs';
import { calculateAge } from '@/helpers/utils';
import Image from 'next/image';
import { UserProfile } from '@/interfaces';
import { GetProfile, GetToken } from '@/libs/api-manager/manager';
import { ProgressBarLink } from '@/components/ProgressBar';
import { get } from 'lodash';
import ErrorToaster from '@/components/ErrorToaster';

const ProfilePage = async () => {
  let token;
  let profileDetails: UserProfile | null = null;
  try {
    token = await GetToken();
    profileDetails = await GetProfile(token);
  } catch (error) {
    const message = get(error, 'message', '');
    if ((message as string) === 'Expired token') {
      return <ErrorToaster message="Please login again to continue" login={true} errorMessage={String(error)} />;
    } else {
      return <ErrorToaster message="Profile not available currently" errorMessage={String(error)} />;
    }
  }

  if (!profileDetails || !token) {
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
      <Box className="user-profile__info" textAlign={'center'} mb={3}>
        <Image
          src="/img/aiavatar.png"
          width={150}
          height={150}
          alt="User Avtar image"
          style={{ borderRadius: '50%', marginTop: '10px' }}
        />
        <Typography variant="h5" component="h2" fontWeight={500} mb={1}>
          {profileDetails?.acf?.first_name} {profileDetails?.acf?.last_name}
        </Typography>
        <Typography variant="body2" mb={1}>
          Age {age}
        </Typography>
        <ProgressBarLink href={'/vip-profile-builder'} className="button button--link">
          <span style={{ textDecoration: 'underline', fontWeight:'400' }}>Edit Profile</span>
        </ProgressBarLink>
      </Box>
      <Box>
        <ProfileTabs profileData={profileDetails?.acf} />
      </Box>
    </>
  );
};

export default ProfilePage;
