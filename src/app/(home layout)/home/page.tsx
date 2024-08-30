import React, { Suspense } from 'react';
import { Box, Container } from '@mui/material';
import './Home.scss';
import HomePage from '@/site-pages/HomePage';
import HomePageLoading from '@/site-pages/HomePage/loading';

export default function Page() {
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
