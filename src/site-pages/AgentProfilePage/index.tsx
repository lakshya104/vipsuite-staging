import React from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import ErrorFallback from '@/components/ErrorFallback';
import { ContactsComponent } from '@/components/ProfileComponents';
import { ProgressBarLink } from '@/components/ProgressBar';
import { DefaultImageFallback } from '@/helpers/enums';
import { GetAgentProfile, GetToken } from '@/libs/api-manager/manager';
import ErrorHandler from '@/components/ErrorHandler';
import { paths } from '@/helpers/paths';
import en from '@/helpers/lang';

const AgentProfilePage = async () => {
  const token = await GetToken();
  const { data: profileDetails, error } = await GetAgentProfile(token);
  if (error) {
    return <ErrorHandler error={error} errMessage={en.agentProfile.errMessage} />;
  }
  if (!profileDetails) {
    return <ErrorFallback errorMessage={en.agentProfile.errProfileMessage} />;
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
        <ProgressBarLink href={paths.root.editProfile.getHref()} className="button button--link">
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
