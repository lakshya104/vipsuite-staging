import React from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import ProfileTabs from '@/components/ProfileTabs';
import { calculateAge } from '@/helpers/utils';
import { UserProfile } from '@/interfaces';
import { GetProfile } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import EditProfileBtn from '@/components/EditProfileBtn';
import { DefaultImageFallback } from '@/helpers/enums';

const ProfilePage = async () => {
  const profileDetails: UserProfile = await GetProfile();
  if (!profileDetails) {
    return <ErrorFallback errorMessage="Not able to show Profile currently." />;
  }
  const age = calculateAge(profileDetails?.acf.date_of_birth);
  return (
    <>
      <Box className="user-profile__info" textAlign={'center'} mb={3}>
        <Image
          src={DefaultImageFallback.PersonPlaceholder}
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
        <EditProfileBtn />
      </Box>
      <Box>
        <ProfileTabs profileData={profileDetails} />
      </Box>
    </>
  );
};

export default ProfilePage;
