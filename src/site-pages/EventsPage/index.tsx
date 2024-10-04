import React from 'react';
import { cookies } from 'next/headers';
import { GetSession, GetVipEvents } from '@/libs/api-manager/manager';
import EventCards from '@/components/EventsPage';
import ErrorHandler from '@/components/ErrorHandler';
import ErrorFallback from '@/components/ErrorFallback';
import { getVipId } from '@/helpers/utils';

const EventsPage = async () => {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get('vipId');
    const session = await GetSession();
    const { token, role } = session;
    const vipId = getVipId(role, userId, session);
    if (!vipId) {
      return <ErrorFallback errorMessage="VIP ID not found." />;
    }
    const events = await GetVipEvents(token, vipId);
    if (!events || events.length === 0) {
      return <ErrorFallback errorMessage="Currently there are no events." hideSubtext={true} />;
    }

    return <EventCards eventsData={events} />;
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to show events currently!" />;
  }
};

export default EventsPage;
