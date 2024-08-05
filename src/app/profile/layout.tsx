import React from 'react';
import HomeHeader from '@/components/Header/HomeHeader';
import HomeFooter from '@/components/HomeFooter';
import { Avatar, Box, Button, Container, Typography } from '@mui/material';
import ProfilePageTabs from '@/components/ProfileTabs';
import './profile.scss';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import Link from 'next/link';

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HomeHeader />
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
          <Box className="user-profile__details">{children}</Box>
        </Container>
      </Box>
      <HomeFooter />
    </>
  );
}
