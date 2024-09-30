import React from 'react';
import { GetVipEvents } from '@/libs/api-manager/manager';
import EventCards from '@/components/EventsPage';
import ErrorHandler from '@/components/ErrorHandler';
import ErrorFallback from '@/components/ErrorFallback';
import { Session } from '@/interfaces';
import { auth } from '@/auth';
import { cookies } from 'next/headers';

interface EventsPageProps {
  isAgent?: boolean;
}
const EventsPage: React.FC<EventsPageProps> = async ({ isAgent }) => {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get('vipId');
    const session = await auth();
    const token = (session?.user as unknown as Session)?.token;
    const vipId = !isAgent ? (session?.user as unknown as Session)?.vip_profile_id : Number(userId?.value);
    const events = await GetVipEvents(token, vipId);
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
