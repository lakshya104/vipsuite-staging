import React from 'react';
import { GetVipEvents } from '@/libs/api-manager/manager';
import { Event } from '@/interfaces/events';
import EventCards from '@/components/EventsPage';
import ErrorHandler from '@/components/ErrorHandler';

const EventsPage = async () => {
  try {
    const events: Event[] = await GetVipEvents();
    return <EventCards eventsData={events} />;
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to show events currently." />;
  }
};

export default EventsPage;
