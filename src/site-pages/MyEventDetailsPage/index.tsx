import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FeedbackForm from '@/features/FeedbackForm';
import { ProgressBarLink } from '@/components/ProgressBar';

interface MyEventDetailsPageProps {
  eventId: number;
}

const MyEventDetailsPage: React.FC<MyEventDetailsPageProps> = async ({ eventId }) => {
  console.log({ eventId });
  return (
    <Container>
      <Typography className="page-title" variant="h2" align="center" gutterBottom>
        <ProgressBarLink href={'/my-events'}>
          <ArrowBackIcon />
        </ProgressBarLink>
        {eventId}
      </Typography>
      <Box mb={2.5}>
        <Typography variant="body1"> 20/05/2024</Typography>
        <Typography variant="body1">Time: 7 pm</Typography>
        <Typography variant="body1" gutterBottom>
          Location: Venue, Address 1, Address 2, Postcode
        </Typography>
        <Typography variant="body1" mt={2}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque lobortis cursus sem, in vestibulum odio
          molestie in. Curabitur interdum purus ac neque volutpat, in tempor ex blandit. Curabitur ac condimentum risus.
        </Typography>
      </Box>
      <FeedbackForm type="event" />
    </Container>
  );
};

export default MyEventDetailsPage;
