import React from 'react';
import { GetSession, GetVipEventDetails } from '@/libs/api-manager/manager';
import EventDetailsCard from '@/components/EventDetails';
import ErrorHandler from '@/components/ErrorHandler';
import en from '@/helpers/lang';

interface EventDetailsPageProps {
  id: number;
}

const EventDetailsPage: React.FC<EventDetailsPageProps> = async ({ id }) => {
  const [{ data: eventDetails, error }, session] = await Promise.all([GetVipEventDetails(Number(id)), GetSession()]);
  if (error) {
    return <ErrorHandler error={error} errMessage={en.events.errMessage} />;
  }
  return <EventDetailsCard event={eventDetails} userRole={session?.role} />;
};

export default EventDetailsPage;
