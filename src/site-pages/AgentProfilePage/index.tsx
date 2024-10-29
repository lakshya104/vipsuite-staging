import React from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import { UserProfile } from '@/interfaces';
import ErrorFallback from '@/components/ErrorFallback';
import { ContactsComponent } from '@/components/ProfileComponents';
import { ProgressBarLink } from '@/components/ProgressBar';
import { DefaultImageFallback } from '@/helpers/enums';
import { GetAgentProfile, GetToken } from '@/libs/api-manager/manager';

const AgentProfilePage = async () => {
  const token = await GetToken();
  const profileDetails: UserProfile = await GetAgentProfile(token);
  if (!profileDetails) {
    return <ErrorFallback errorMessage="Not able to show Profile currently." />;
  }
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
        <ProgressBarLink href={'edit-profile'} className="button button--link">
          <span style={{ textDecoration: 'underline', fontWeight: '400' }}>Edit Profile</span>
        </ProgressBarLink>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '80%', justifyContent: 'center' }}>
          <ContactsComponent profileDetails={profileDetails} isAgent={true} />
        </Box>
      </Box>
    </>
  );
};

export default AgentProfilePage;
