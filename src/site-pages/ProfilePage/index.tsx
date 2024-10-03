import React from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import ProfileTabs from '@/components/ProfileTabs';
import { calculateAge } from '@/helpers/utils';
import { UserProfile } from '@/interfaces';
import { GetProfile, GetSession } from '@/libs/api-manager/manager';
import { ProgressBarLink } from '@/components/ProgressBar';
import ErrorHandler from '@/components/ErrorHandler';
import ErrorFallback from '@/components/ErrorFallback';
import { UserRole } from '@/helpers/enums';
import { ContactsComponent } from '@/components/ProfileComponents';

const ProfilePage = async () => {
  try {
    const session = await GetSession();
    const { token, role } = session;
    const profileDetails: UserProfile = await GetProfile(token);
    if (!profileDetails) {
      return <ErrorFallback errorMessage="Not able to show Profile currently." />;
    }
    const age = calculateAge(profileDetails?.acf.date_of_birth);
    const editProfileLink = role === UserRole.Vip ? '/vip-profile-builder' : 'edit-profile';
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
          {role === UserRole.Vip && (
            <Typography variant="body2" mb={1}>
              Age {age}
            </Typography>
          )}
          <ProgressBarLink href={editProfileLink} className="button button--link">
            <span style={{ textDecoration: 'underline', fontWeight: '400' }}>Edit Profile</span>
          </ProgressBarLink>
        </Box>
        {role === UserRole.Vip ? (
          <Box>
            <ProfileTabs profileData={profileDetails} />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '80%', justifyContent: 'center' }}>
              <ContactsComponent profileDetails={profileDetails} />
            </Box>
          </Box>
        )}
      </>
    );
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to show Profile currently." />;
  }
};

export default ProfilePage;
