import React from 'react';
import { Event } from '@/interfaces/events';
import { GetVipEvents } from '@/libs/api-manager/manager';
import EventCards from '@/components/EventsPage';
import ErrorHandler from '@/components/ErrorHandler';
import ErrorFallback from '@/components/ErrorFallback';

const EventsPage = async () => {
  let events: Event[] | null = null;
  try {
    events = await GetVipEvents();
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to show events currently!" />;
  }
  if (!events || events.length === 0) {
    return <ErrorFallback errorMessage="Currently there are no events." hideSubtext={true} />;
  }
  return <EventCards eventsData={events} />;
};

export default EventsPage;
