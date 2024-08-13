import React from 'react';
import { BioComponent, ContactsComponent, SocialComponent } from '@/components/ProfileComponents';
import { Box, Button, Container, Typography } from '@mui/material';
import ProfileTabs from '@/components/ProfileTabs';
import './profile.scss';
import { GetProfile, GetToken } from '@/libs/api-manager/manager';
import { calculateAge } from '@/helpers/utils';
import Image from 'next/image';

interface SearchParams {
  [key: string]: string | string[];
}

interface PageProps {
  searchParams: SearchParams;
}

export default async function Page({ searchParams }: PageProps) {
  const token = await GetToken();
  const profileDetails = await GetProfile(token);
  const age = calculateAge(profileDetails?.acf.date_of_birth);

  const section = searchParams?.section;
  const renderSection = () => {
    switch (section) {
      case 'bio':
        return <BioComponent profileDetails={profileDetails?.acf} />;
      case 'social':
        return <SocialComponent profileDetails={profileDetails?.acf} />;
      case 'contacts':
        return <ContactsComponent profileDetails={profileDetails?.acf} />;
      default:
        return <BioComponent profileDetails={profileDetails?.acf} />;
    }
  };

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
            <ProfileTabs />
          </Box>
          <Box className="user-profile__details">{renderSection()}</Box>
        </Container>
      </Box>
    </>
  );
}
