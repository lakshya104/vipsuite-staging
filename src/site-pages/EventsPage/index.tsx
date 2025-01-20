import React from 'react';
import { GetVipEvents } from '@/libs/api-manager/manager';
import EventCards from '@/components/EventsPage';
import ErrorHandler from '@/components/ErrorHandler';
import en from '@/helpers/lang';

const EventsPage = async ({ currentPage, search }: { currentPage: number; search?: string }) => {
  const { data: events, totalPages, error } = await GetVipEvents(currentPage, search);
  if (error) {
    return <ErrorHandler error={error} errMessage={en.events.listingErrMessage} />;
  }
  return <EventCards eventsData={events} totalPages={totalPages} currentPage={currentPage} />;
};

export default EventsPage;
