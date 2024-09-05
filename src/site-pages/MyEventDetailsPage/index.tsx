import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FeedbackForm from '@/features/FeedbackForm';
import { ProgressBarLink } from '@/components/ProgressBar';
import { EventDetails } from '@/interfaces/events';
import { GetUserIdAndToken, GetVipEventDetails } from '@/libs/api-manager/manager';
import { formatDateWithoutOrdinal } from '@/helpers/utils';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';

interface MyEventDetailsPageProps {
  eventId: number;
}

const MyEventDetailsPage: React.FC<MyEventDetailsPageProps> = async ({ eventId }) => {
  let eventDetails: EventDetails | null = null;
  let id: number | null = null;
  let token: string | null = null;
  try {
    const result = await GetUserIdAndToken();
    ({ id, token } = result);
    if (!token || !id) {
      return <ErrorFallback errorMessage="Your token is invalid." />;
    }
    eventDetails = await GetVipEventDetails(Number(eventId), token);
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Event Details not available at the moment." />;
  }

  if (!eventDetails) {
    return <ErrorFallback errorMessage="Event Details not found." hideSubtext={true} />;
  }

  return (
    <Container>
      <Typography className="page-title" variant="h2" align="center" gutterBottom>
        <ProgressBarLink href={'/my-events'}>
          <ArrowBackIcon />
        </ProgressBarLink>
        {eventDetails?.title?.rendered}
      </Typography>
      <Box mb={2.5}>
        <Typography variant="body1">{formatDateWithoutOrdinal(eventDetails?.acf?.event_start_date)}</Typography>
        <Typography variant="body1" gutterBottom>
          Location: {eventDetails?.acf?.event_location}
        </Typography>
        <Typography variant="body1" mt={2}>
          {eventDetails.acf?.event_quick_overview}
        </Typography>
      </Box>
      {!eventDetails?.acf?.is_feedback_provided && (
        <FeedbackForm type="event" token={token} vipId={id} orderId={eventId} />
      )}
    </Container>
  );
};

export default MyEventDetailsPage;
