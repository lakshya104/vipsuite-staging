import React, { Suspense } from 'react';
import { Box, Container } from '@mui/material';
import '../Event.scss';
import EventDetailsPage from '@/site-pages/EventDetailsPage';
import EventDetailsLoading from '@/site-pages/EventDetailsPage/loading';

export default async function Page({ params }: { params: { id: number } }) {
  return (
    <Box component={'main'} className="product-detail">
      <Container>
        <Suspense fallback={<EventDetailsLoading />}>
          <EventDetailsPage id={params?.id} />
        </Suspense>
      </Container>
    </Box>
  );
}
