import React from 'react';
import { Box, Container } from '@mui/material';
import HomePageLoading from '@/site-pages/HomePage/loading';
import './Home.scss';

export default function Loading() {
  return (
    <Box component={'main'} className="landing-page">
      <Container>
        <HomePageLoading />
      </Container>
    </Box>
  );
}
