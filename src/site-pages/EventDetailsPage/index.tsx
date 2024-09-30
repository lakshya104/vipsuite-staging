import React from 'react';
import { GetVipEventDetails } from '@/libs/api-manager/manager';
import EventDetailsCard from '@/components/EventDetails';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';
import { Session } from '@/interfaces';
import { auth } from '@/auth';
import { cookies } from 'next/headers';

interface EventDetailsPageProps {
  id: number;
  isAgent?: boolean;
}

const EventDetailsPage: React.FC<EventDetailsPageProps> = async ({ id, isAgent }) => {
  if (!id) {
    return <ErrorFallback errorMessage="Invalid Event ID provided." />;
  }
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get('vipId');
    const session = await auth();
    const token = (session?.user as unknown as Session)?.token;
    const vipId = !isAgent ? (session?.user as unknown as Session)?.vip_profile_id : Number(userId?.value);
    const eventDetails = await GetVipEventDetails(Number(id), token, vipId);
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
