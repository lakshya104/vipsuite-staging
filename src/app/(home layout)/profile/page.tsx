import React from 'react';
import { Box, Container, Link, Typography } from '@mui/material';
import ProfileTabs from '@/components/ProfileTabs';
import './profile.scss';
import { calculateAge } from '@/helpers/utils';
import Image from 'next/image';
import { UserProfile } from '@/interfaces';
import { GetProfile, GetToken } from '@/libs/api-manager/manager';

const Profile = async() => {
  const token = await GetToken();
  const profileDetails: UserProfile = await GetProfile(token);

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
              Age {age}
            </Typography>
            <Link href={'/vip-profile-builder'} className="button button--link">
              Edit Profile
            </Link>
          </Box>
          <Box>
            <ProfileTabs profileData={profileDetails.acf} />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Profile;