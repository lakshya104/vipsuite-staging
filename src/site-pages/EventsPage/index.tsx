import React from 'react';
import { GetVipEvents } from '@/libs/api-manager/manager';
import EventCards from '@/components/EventsPage';
import ErrorHandler from '@/components/ErrorHandler';
import en from '@/helpers/lang';

const EventsPage = async ({ search }: { search?: string }) => {
  const { data: events, error } = await GetVipEvents(search);
  if (error) {
    return <ErrorHandler error={error} errMessage={en.events.listingErrMessage} />;
  }
  return <EventCards eventsData={events} />;
};

export default EventsPage;
