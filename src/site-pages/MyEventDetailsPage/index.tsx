// import React from 'react';
// import { EventDetails } from '@/interfaces/events';
// import { GetVipEventDetails } from '@/libs/api-manager/manager';
// import ErrorFallback from '@/components/ErrorFallback';
// import MyEventDetailsContainer from '@/components/MyEventDetailsContainer';

// interface MyEventDetailsPageProps {
//   eventId: number;
// }

// const MyEventDetailsPage: React.FC<MyEventDetailsPageProps> = async ({ eventId }) => {
//   const eventDetails: EventDetails = await GetVipEventDetails(Number(eventId));
//   if (!eventDetails) {
//     return <ErrorFallback errorMessage="Event Details not found." hideSubtext={true} />;
//   }
//   return <MyEventDetailsContainer eventDetails={eventDetails} eventId={eventId} />;
// };

// export default MyEventDetailsPage;
