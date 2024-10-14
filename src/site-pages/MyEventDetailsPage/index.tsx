import React from 'react';
import { cookies } from 'next/headers';
import { EventDetails } from '@/interfaces/events';
import { GetVipEventDetails, GetSession } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';
import MyEventDetailsContainer from '@/components/MyEventDetailsContainer';
import { getVipId } from '@/helpers/utils';

interface MyEventDetailsPageProps {
  eventId: number;
}

const MyEventDetailsPage: React.FC<MyEventDetailsPageProps> = async ({ eventId }) => {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get('vipId');
    const session = await GetSession();
    const { token, role } = session;
    const vipId = getVipId(role, userId, session);
    if (!vipId) {
      return <ErrorFallback errorMessage="VIP ID not found." />;
    }
    const eventDetails: EventDetails = await GetVipEventDetails(Number(eventId), token, vipId);
    if (!eventDetails) {
      return <ErrorFallback errorMessage="Event Details not found." hideSubtext={true} />;
    }
    return <MyEventDetailsContainer eventDetails={eventDetails} id={vipId} token={token} eventId={eventId} />;
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Event Details not available at the moment." />;
  }
};

export default MyEventDetailsPage;
