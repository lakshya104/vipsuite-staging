import React from 'react';
import { GetVipEvents } from '@/libs/api-manager/manager';
import EventCards from '@/components/EventsPage';
import ErrorHandler from '@/components/ErrorHandler';
import ErrorFallback from '@/components/ErrorFallback';
import { Session } from '@/interfaces';
import { auth } from '@/auth';

const EventsPage = async () => {
  try {
    const [session, events] = await Promise.all([auth(), GetVipEvents()]);

    const token = (session?.user as unknown as Session)?.token;
    const vipId = (session?.user as unknown as Session)?.vip_profile_id;

    if (!token) {
      return <ErrorFallback errorMessage="Your token is invalid." />;
    }

    if (!events || events.length === 0) {
      return <ErrorFallback errorMessage="Currently there are no events." hideSubtext={true} />;
    }

    return <EventCards eventsData={events} token={token} vipId={vipId} />;
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to show events currently!" />;
  }
};

export default EventsPage;
