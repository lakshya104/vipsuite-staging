import React from 'react';
import { GetVipEventDetails } from '@/libs/api-manager/manager';
import EventDetailsCard from '@/components/EventDetails';
import ErrorFallback from '@/components/ErrorFallback';

interface EventDetailsPageProps {
  id: number;
}

const EventDetailsPage: React.FC<EventDetailsPageProps> = async ({ id }) => {
  if (!id) {
    return <ErrorFallback errorMessage="Invalid Event ID provided." />;
  }
  const eventDetails = await GetVipEventDetails(Number(id));
  if (!eventDetails) {
    return <ErrorFallback errorMessage="Event Details not found." />;
  }
  return <EventDetailsCard event={eventDetails} />;
};

export default EventDetailsPage;
