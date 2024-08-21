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
      <Container>
        <Typography align="center" variant="h4" marginTop={5}>
          Event Details not found.
        </Typography>
      </Container>
    );
  }
  return (
    <Box component={'main'} className="landing-page">
      <Container>
        <EventDetailsPage event={eventDetails} />
      </Container>
    </Box>
  );
}
