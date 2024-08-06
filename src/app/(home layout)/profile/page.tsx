import React from 'react';
import { BioComponent, ContactsComponent, SocialComponent } from '@/components/ProfileComponents';
import { Avatar, Box, Button, Container, Typography } from '@mui/material';
import ProfilePageTabs from '@/components/ProfileTabs';
import './profile.scss';

interface SearchParams {
  [key: string]: string | string[];
}

interface PageProps {
  searchParams: SearchParams;
}

export default function Page({ searchParams }: PageProps) {
  const section = searchParams?.section;
  const renderSection = () => {
    switch (section) {
      case 'bio':
        return <BioComponent />;
      case 'social':
        return <SocialComponent />;
      case 'contacts':
        return <ContactsComponent />;
      default:
        return <BioComponent />;
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
            <Avatar src="/img/aiavatar.png" alt="User Avtar image" className="user-profile__avtar" />
            <Typography variant="h5" component="h2" fontWeight={500} mb={1}>
              Sarah Jacobs
            </Typography>
            <Typography variant="body2" mb={2}>
              Age 34 | Female | Married
            </Typography>
            <Button variant="text" size="small">
              Edit Profile
            </Button>
          </Box>
          <Box>
            <ProfilePageTabs />
          </Box>
          <Box className="user-profile__details">{renderSection()}</Box>
        </Container>
      </Box>
    </>
  );
}
