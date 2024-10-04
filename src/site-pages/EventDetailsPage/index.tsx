import React from 'react';
import { cookies } from 'next/headers';
import { GetSession, GetVipEventDetails } from '@/libs/api-manager/manager';
import EventDetailsCard from '@/components/EventDetails';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';
import { getVipId } from '@/helpers/utils';

interface EventDetailsPageProps {
  id: number;
}

const EventDetailsPage: React.FC<EventDetailsPageProps> = async ({ id }) => {
  if (!id) {
    return <ErrorFallback errorMessage="Invalid Event ID provided." />;
  }
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get('vipId');
    const session = await GetSession();
    const { token, role } = session;
    const vipId = getVipId(role, userId, session);
    if (!vipId) {
      return <ErrorFallback errorMessage="VIP ID not found." />;
    }
    const eventDetails = await GetVipEventDetails(Number(id), token, vipId);
    if (!token) {
      return <ErrorFallback errorMessage="Your token is invalid." />;
    }
    if (!eventDetails) {
      return <ErrorFallback errorMessage="Event Details not found." />;
    }
    return <EventDetailsCard event={eventDetails} token={token} />;
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to show event details currently." />;
  }
};

export default EventDetailsPage;
