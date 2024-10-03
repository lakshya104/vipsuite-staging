import React from 'react';
import { EventDetails } from '@/interfaces/events';
import { GetUserIdAndToken, GetVipEventDetails } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';
import MyEventDetailsContainer from '@/components/MyEventDetailsContainer';

interface MyEventDetailsPageProps {
  eventId: number;
}
const MyEventDetailsPage: React.FC<MyEventDetailsPageProps> = async ({ eventId }) => {
  try {
    const result = await GetUserIdAndToken();
    const { id, token } = result;
    if (!token || !id) {
      return <ErrorFallback errorMessage="Your token is invalid." />;
    }
    const eventDetails: EventDetails = await GetVipEventDetails(Number(eventId), token, id);

    if (!eventDetails) {
      return <ErrorFallback errorMessage="Event Details not found." hideSubtext={true} />;
    }
    return <MyEventDetailsContainer eventDetails={eventDetails} id={id} token={token} eventId={eventId} />;
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Event Details not available at the moment." />;
  }
};

export default MyEventDetailsPage;
