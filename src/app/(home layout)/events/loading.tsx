import React from 'react';
import { Box, Container } from '@mui/material';
import './Event.scss';
import EventsPageLoading from '@/site-pages/EventsPage/loading';

export default function Loading() {
  return (
    <Box component={'main'} className="landing-page">
      <Container>
        <EventsPageLoading />
      </Container>
    </Box>
  );
}
