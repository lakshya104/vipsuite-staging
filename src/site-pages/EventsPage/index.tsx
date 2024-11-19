import React from 'react';
import { isEmpty } from 'lodash';
import { GetVipEvents } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import { Event } from '@/interfaces/events';
import EventCards from '@/components/EventsPage';
import ErrorHandler from '@/components/ErrorHandler';

const EventsPage = async () => {
  try {
    const events: Event[] = await GetVipEvents();
    if (!events || isEmpty(events)) {
      return <ErrorFallback errorMessage="Currently there are no events." hideSubtext={true} />;
    }
    return <EventCards eventsData={events} />;
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to show events currently." />;
  }
};

export default EventsPage;
