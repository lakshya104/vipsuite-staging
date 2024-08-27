import React, { Suspense } from 'react';
import { Box, Container } from '@mui/material';
import './Home.scss';
import HomePageLoading from '@/sitePages/HomePage/loading';
import HomePage from '@/sitePages/HomePage';

export default async function Page() {
  return (
    <Box component={'main'} className="landing-page">
      <Container>
        <Suspense fallback={<HomePageLoading />}>
          <HomePage />
        </Suspense>
      </Container>
    </Box>
  );
}
