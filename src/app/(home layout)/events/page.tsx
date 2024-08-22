import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import EventsPage from '@/components/EventsPage';
import { Event } from '@/interfaces/events';
import { GetVipEvents } from '@/libs/api-manager/manager';
import ErrorToaster from '@/components/ErrorToaster';
import { get } from 'lodash';
import './Event.scss';

export default async function Page() {
  let events: Event[] | null = null;
  try {
    events = await GetVipEvents();
  } catch (error) {
    const message = get(error, 'message', '');
    if ((message as string) === 'Expired token') {
      return <ErrorToaster message="Please login again to continue" login={true} errorMessage={String(error)} />;
    } else {
      return <ErrorToaster message="Events not found!" errorMessage={String(error)} />;
    }
  }
  if (!events || events.length === 0) {
    return (
      <Container>
        <Typography align="center" variant="h6" marginTop={5}>
          Currently there are no events.
        </Typography>
      </Container>
    );
  }
  return (
    <Box component={'main'} className="landing-page">
      <Container>
        <EventsPage eventsData={events} />
      </Container>
    </Box>
  );
}
