import React from 'react';
import { GetVipEventDetails } from '@/libs/api-manager/manager';
import EventDetailsCard from '@/components/EventDetails';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';
import { Session } from '@/interfaces';
import { auth } from '@/auth';

const EventDetailsPage = async ({ id }: { id: number }) => {
  if (!id) {
    return <ErrorFallback errorMessage="Invalid Event ID provided." />;
  }
  try {
    const [session, eventDetails] = await Promise.all([auth(), GetVipEventDetails(Number(id))]);
    const token = (session?.user as unknown as Session)?.token;
    const vipId = (session?.user as unknown as Session)?.vip_profile_id;
    if (!token) {
      return <ErrorFallback errorMessage="Your token is invalid." />;
    }
    if (!eventDetails) {
      return <ErrorFallback errorMessage="Event Details not found." />;
    }
    return <EventDetailsCard event={eventDetails} token={token} vipId={vipId} />;
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to show event details currently." />;
  }
};

export default EventDetailsPage;
