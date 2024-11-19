import React from 'react';
import { GetVipEventDetails } from '@/libs/api-manager/manager';
import EventDetailsCard from '@/components/EventDetails';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';

interface EventDetailsPageProps {
  id: number;
}

const EventDetailsPage: React.FC<EventDetailsPageProps> = async ({ id }) => {
  try {
    if (!id) {
      return <ErrorFallback errorMessage="Invalid Event ID provided." />;
    }
    const eventDetails = await GetVipEventDetails(Number(id));
    if (!eventDetails) {
      return <ErrorFallback errorMessage="Event Details not found." />;
    }
    return <EventDetailsCard event={eventDetails} />;
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to show event details currently." />;
  }
};

export default EventDetailsPage;
