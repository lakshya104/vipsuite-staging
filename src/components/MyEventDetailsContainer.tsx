import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ProgressBarLink } from './ProgressBar';
import { formatDateWithoutOrdinal } from '@/helpers/utils';
import FeedbackForm from '@/features/FeedbackForm';
import { EventDetails } from '@/interfaces/events';

interface MyEventDetailsContainerProps {
  eventDetails: EventDetails;
  token: string;
  id: number;
  eventId: number;
}

const MyEventDetailsContainer: React.FC<MyEventDetailsContainerProps> = ({ eventDetails, token, id, eventId }) => {
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

export default MyEventDetailsContainer;
