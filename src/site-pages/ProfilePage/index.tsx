import React from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import ProfileTabs from '@/components/ProfileTabs';
import { calculateAge, getVipId } from '@/helpers/utils';
import { UserProfile } from '@/interfaces';
import { GetProfile, GetSession } from '@/libs/api-manager/manager';
import ErrorHandler from '@/components/ErrorHandler';
import ErrorFallback from '@/components/ErrorFallback';
import { cookies } from 'next/headers';
import EditProfileBtn from '@/components/EditProfileBtn';
import { DefaultImageFallback } from '@/helpers/enums';

const ProfilePage = async () => {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get('vipId');
    const session = await GetSession();
    const { token, role } = session;
    const vipId = getVipId(role, userId, session);
    if (!vipId) {
      return <ErrorFallback errorMessage="VIP ID not found." />;
    }
    const profileDetails: UserProfile = await GetProfile(token, vipId);
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
          <EditProfileBtn role={role} vipId={vipId} />
        </Box>
        <Box>
          <ProfileTabs profileData={profileDetails} />
        </Box>
      </>
    );
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to show Profile currently." />;
  }
};

export default ProfilePage;
