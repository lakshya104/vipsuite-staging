import React, { Suspense } from 'react';
import { Box, Container, Typography } from '@mui/material';
import './profile.scss';
import ProfilePage from '@/site-pages/ProfilePage';
import ProfilePageLoading from '@/site-pages/ProfilePage/loading';
import en from '@/helpers/lang';
import { cookies } from 'next/headers';
import { CookieName, UserRole } from '@/helpers/enums';
import AgentProfilePage from '@/site-pages/AgentProfilePage';
import { GetSession } from '@/libs/api-manager/manager';
import BrandProfilePage from '@/site-pages/BrandProfilePage';

export default async function Page() {
  const [cookieStore, session] = await Promise.all([cookies(), GetSession()]);
  const isBrand = session?.role === UserRole.Brand;
  const isAgentRoute = cookieStore.get(CookieName.IsAgent)?.value;
  const userId = cookieStore.get(CookieName.ProfileId);
  const isAgent = session?.role === UserRole.Agent;
  const showAgentProfile = isAgentRoute === 'true' || (isAgent && !userId);
  return (
    <Box className="user-profile">
      <Container>
        <Typography className="page-title" variant="h2" align="center">
          {en.profilePage.title}
        </Typography>
        <Suspense fallback={<ProfilePageLoading />}>
          {isBrand ? <BrandProfilePage /> : showAgentProfile ? <AgentProfilePage /> : <ProfilePage />}
        </Suspense>
      </Container>
    </Box>
  );
}
