import React, { Suspense } from 'react';
import { Box, Container } from '@mui/material';
import './Home.scss';
import HomePage from '@/site-pages/HomePage';
import HomePageLoading from '@/site-pages/HomePage/loading';
import { GetSession } from '@/libs/api-manager/manager';
import BrandHome from '@/components/BrandHome';

export default async function Page() {
  const session = await GetSession();
  return (
    <Box component={'main'} className="landing-page">
      <Container>
        {session.role === 'brand' ? (
          <BrandHome firstName={session?.first_name} />
        ) : (
          <Suspense fallback={<HomePageLoading />}>
            <HomePage />
          </Suspense>
        )}
      </Container>
    </Box>
  );
}
