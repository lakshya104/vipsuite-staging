import React, { Suspense } from 'react';
import { Box, Container } from '@mui/material';
import '../Event.scss';
import EventDetailsPage from '@/site-pages/EventDetailsPage';
import EventDetailsLoading from '@/site-pages/EventDetailsPage/loading';

export default async function Page(props: { params: Promise<{ id: number }> }) {
  const params = await props.params;
  return (
    <Box component={'main'} className="product-detail product-slides">
      <Container>
        <Suspense fallback={<EventDetailsLoading />}>
          <EventDetailsPage id={params?.id} />
        </Suspense>
      </Container>
    </Box>
  );
}
