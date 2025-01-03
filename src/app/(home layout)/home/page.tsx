import React, { Suspense } from 'react';
import { Box, Container, Typography } from '@mui/material';
import './Home.scss';
import HomePage from '@/site-pages/HomePage';
import HomePageLoading from '@/site-pages/HomePage/loading';
import { GetSession } from '@/libs/api-manager/manager';

export default async function Page() {
  const session = await GetSession();
  return (
    <Box component={'main'} className="landing-page">
      <Container>
        {session.role === 'brand' ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mt: 5,
              gap: 15,
              flexDirection: 'column',
            }}
          >
            <Typography variant="h2">Welcome back, {session.first_name}</Typography>
            <Typography textAlign="center" variant="h1">
              Home page is coming soon
            </Typography>
          </Box>
        ) : (
          <Suspense fallback={<HomePageLoading />}>
            <HomePage />
          </Suspense>
        )}
      </Container>
    </Box>
  );
}
