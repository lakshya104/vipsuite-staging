import React from 'react';
import { GetVipEventDetails } from '@/libs/api-manager/manager';
import EventDetailsCard from '@/components/EventDetails';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';

interface EventDetailsPageProps {
  id: number;
}

const EventDetailsPage: React.FC<EventDetailsPageProps> = async ({ id }) => {
  if (!id) {
    return <ErrorFallback errorMessage="Invalid Event ID provided." />;
  }
  const { data: eventDetails, error } = await GetVipEventDetails(Number(id));
  if (error) {
    return <ErrorHandler error={error} errMessage="Not able to show event details currently." />;
  }
  if (!eventDetails) {
    return <ErrorFallback errorMessage="Event Details not found." />;
  }
  return <EventDetailsCard event={eventDetails} />;
};

export default EventDetailsPage;
