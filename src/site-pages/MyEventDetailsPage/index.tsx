import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FeedbackForm from '@/features/FeedbackForm';
import { ProgressBarLink } from '@/components/ProgressBar';
import { EventDetails } from '@/interfaces/events';
import { GetUserIdAndToken, GetVipEventDetails } from '@/libs/api-manager/manager';
import ErrorToaster from '@/components/ErrorToaster';
import { formatDateWithoutOrdinal } from '@/helpers/utils';

interface MyEventDetailsPageProps {
  eventId: number;
}

const MyEventDetailsPage: React.FC<MyEventDetailsPageProps> = async ({ eventId }) => {
  let eventDetails: EventDetails | null = null;
  const { id: vipId, token } = await GetUserIdAndToken();
  try {
    eventDetails = await GetVipEventDetails(Number(eventId), token);
  } catch (error) {
    const message = (error as Error).message || '';
    if (message === 'Expired token') {
      return <ErrorToaster message="Please login again to continue" login={true} errorMessage={String(error)} />;
    } else {
      return <ErrorToaster message="Event Details not found!" errorMessage={String(error)} />;
    }
  }

  if (!eventDetails) {
    return (
      <Box component={'main'} className="product-detail">
        <Container>
          <Typography className="page-title" variant="h2" align="center">
            Event Details not found.
          </Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Container>
      <Typography className="page-title" variant="h2" align="center" gutterBottom>
        <ProgressBarLink href={'/my-events'}>
          <ArrowBackIcon />
        </ProgressBarLink>
        {eventDetails.title?.rendered}
      </Typography>
      <Box mb={2.5}>
        <Typography variant="body1">{formatDateWithoutOrdinal(eventDetails.acf?.event_start_date)}</Typography>
        <Typography variant="body1" gutterBottom>
          Location: {eventDetails.acf?.event_location}
        </Typography>
        <Typography variant="body1" mt={2}>
          {eventDetails.acf?.event_quick_overview}
        </Typography>
      </Box>
      {!eventDetails.acf?.is_feedback_provided && (
        <FeedbackForm type="event" token={token} vipId={vipId} orderId={eventId} />
      )}
    </Container>
  );
};

export default MyEventDetailsPage;
