import React from 'react';
import { GetVipEventDetails } from '@/libs/api-manager/manager';
import EventDetailsCard from '@/components/EventDetails';
import ErrorHandler from '@/components/ErrorHandler';
import en from '@/helpers/lang';

interface EventDetailsPageProps {
  id: number;
}

const EventDetailsPage: React.FC<EventDetailsPageProps> = async ({ id }) => {
  const { data: eventDetails, error } = await GetVipEventDetails(Number(id));
  if (error) {
    return <ErrorHandler error={error} errMessage={en.events.errMessage} />;
  }
  return <EventDetailsCard event={eventDetails} />;
};

export default EventDetailsPage;
