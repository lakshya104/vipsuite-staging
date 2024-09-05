import React from 'react';
import { Box, Typography } from '@mui/material';
import ProfileTabs from '@/components/ProfileTabs';
import { calculateAge } from '@/helpers/utils';
import Image from 'next/image';
import { UserProfile } from '@/interfaces';
import { GetProfile, GetToken } from '@/libs/api-manager/manager';
import { ProgressBarLink } from '@/components/ProgressBar';
import ErrorHandler from '@/components/ErrorHandler';
import ErrorFallback from '@/components/ErrorFallback';

const ProfilePage = async () => {
  let token: string | null = null;
  let profileDetails: UserProfile | null = null;
  try {
    token = await GetToken();
    if (!token) {
      return <ErrorFallback errorMessage="Your token is invalid." />;
    }
    profileDetails = await GetProfile(token);
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to show Profile currently." />;
  }

  if (!profileDetails) {
    return <ErrorFallback errorMessage="Not able to show Profile currently." />;
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
          <span style={{ textDecoration: 'underline', fontWeight: '400' }}>Edit Profile</span>
        </ProgressBarLink>
      </Box>
      <Box>
        <ProfileTabs profileData={profileDetails?.acf} />
      </Box>
    </>
  );
};

export default ProfilePage;
