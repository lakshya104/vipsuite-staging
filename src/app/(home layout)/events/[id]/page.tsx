import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import '../Event.scss';
import { GetVipEventDetails } from '@/libs/api-manager/manager';
import { EventDetails } from '@/interfaces/events';
import EventDetailsPage from '@/components/EventDetails';
import ErrorToaster from '@/components/ErrorToaster';
import { get } from 'lodash';

export default async function Page({ params }: { params: { id: number } }) {
  let eventDetails: EventDetails | null = null;
  try {
    eventDetails = await GetVipEventDetails(Number(params?.id));
  } catch (error) {
    const message = get(error, 'message', '');
    if ((message as string) === 'Expired token') {
      return <ErrorToaster message="Please login again to continue" login={true} errorMessage={String(error)} />;
    } else {
      return <ErrorToaster message="Event Details not found!" errorMessage={String(error)} />;
    }
  }
  if (!eventDetails) {
    return (
      <Box component={'main'} className="product-detail">
        <Container>
          <Typography className="page-title" variant="h2" align="center">
            Event Details not found.
          </Typography>
        </Container>
      </Box>
    );
  }
  return (
    <Box component={'main'} className="product-detail">
      <Container>
        <EventDetailsPage event={eventDetails} />
      </Container>
    </Box>
  );
}
