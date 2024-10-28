import React from 'react';
import { EventDetails } from '@/interfaces/events';
import { GetVipEventDetails } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import MyEventDetailsContainer from '@/components/MyEventDetailsContainer';
import { getAuthData } from '@/libs/actions';

interface MyEventDetailsPageProps {
  eventId: number;
}

const MyEventDetailsPage: React.FC<MyEventDetailsPageProps> = async ({ eventId }) => {
  const { token, vipId } = await getAuthData();
  const eventDetails: EventDetails = await GetVipEventDetails(Number(eventId), token, vipId);
  if (!eventDetails) {
    return <ErrorFallback errorMessage="Event Details not found." hideSubtext={true} />;
  }
  return <MyEventDetailsContainer eventDetails={eventDetails} id={vipId} token={token} eventId={eventId} />;
};

export default MyEventDetailsPage;
