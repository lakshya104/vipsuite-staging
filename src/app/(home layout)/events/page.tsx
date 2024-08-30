import React, { Suspense } from 'react';
import { Box, Container } from '@mui/material';
import './Event.scss';
import EventsPage from '@/site-pages/EventsPage';
import EventsPageLoading from '@/site-pages/EventsPage/loading';

export default async function Page() {
  return (
    <Box component={'main'} className="landing-page">
      <Container>
        <Suspense fallback={<EventsPageLoading />}>
          <EventsPage />
        </Suspense>
      </Container>
    </Box>
  );
}
