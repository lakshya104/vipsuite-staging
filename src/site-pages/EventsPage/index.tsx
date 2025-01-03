import React from 'react';
import { GetVipEvents } from '@/libs/api-manager/manager';
import EventCards from '@/components/EventsPage';
import ErrorHandler from '@/components/ErrorHandler';

const EventsPage = async () => {
  const { data: events, error } = await GetVipEvents();
  if (error) {
    return <ErrorHandler error={error} errMessage="Not able to show events currently." />;
  }
  return <EventCards eventsData={events} />;
};

export default EventsPage;
