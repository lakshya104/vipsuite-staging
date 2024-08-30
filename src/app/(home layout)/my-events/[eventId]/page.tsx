import { Box } from '@mui/material';
import React, { Suspense } from 'react';
import '../event.scss';
import MyEventDetailsPage from '@/site-pages/MyEventDetailsPage';
import MyEventDetailsPageLoading from '@/site-pages/MyEventDetailsPage/loading';

export default async function Page({ params }: { params: { eventId: number } }) {
  const eventId = params['eventId'];

  return (
    <Box className="my-events order-details-page">
      <Suspense fallback={<MyEventDetailsPageLoading />}>
        <MyEventDetailsPage eventId={eventId} />
      </Suspense>
    </Box>
  );
}
