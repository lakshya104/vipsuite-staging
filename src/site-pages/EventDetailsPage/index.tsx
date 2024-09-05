import React from 'react';
import { GetToken, GetVipEventDetails } from '@/libs/api-manager/manager';
import { EventDetails } from '@/interfaces/events';
import EventDetailsCard from '@/components/EventDetails';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';

const EventDetailsPage = async ({ id }: { id: number }) => {
  if (!id) {
    return <ErrorFallback errorMessage="Invalid Event ID provided." />;
  }
  let eventDetails: EventDetails | null = null;
  let token: string | null = null;
  try {
    token = await GetToken();
    if (!token) {
      return <ErrorFallback errorMessage="Your token is invalid." />;
    }
    eventDetails = await GetVipEventDetails(Number(id), token);
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Event Details not found." />;
  }

  if (!eventDetails) {
    return <ErrorFallback errorMessage="Event Details not found." />;
  }
  return <EventDetailsCard event={eventDetails} token={token} />;
};

export default EventDetailsPage;
