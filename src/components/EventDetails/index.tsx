import React from 'react';
import { Box, Card, Container, Typography } from '@mui/material';
import FeedLikeIcon from '@/components/FeedLikeIcon';
import { EventDetails } from '@/interfaces/events';
import EventsDialog from '../EventDialog';

const EventDetailsPage = ({ event }: { event: EventDetails }) => {
  const eventImageUrl = event.acf.event_image.sizes['1536x1536'];
  return (
    <Container>
      <EventContainer imageUrl={eventImageUrl} />
      <Typography variant="h6" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        {event.title.rendered}
      </Typography>
      <Typography variant="body1" paragraph sx={{ color: '#494947' }}>
        <Box component="span" sx={{ fontWeight: 'bold' }}>
          Date:
        </Box>{' '}
        {event.acf.event_start_date} - {event.acf.event_end_date}
      </Typography>
      <Typography variant="body1" paragraph sx={{ color: '#494947' }}>
        <Box component="span" sx={{ fontWeight: 'bold' }}>
          Location:
        </Box>{' '}
        {event.acf.event_location}
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#1B1B1B' }}>
        Quick Overview
      </Typography>
      <Typography variant="body1" paragraph sx={{ color: '#494947' }}>
        {event.acf.event_quick_overview}
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#1B1B1B' }}>
        Details
      </Typography>
      <Box dangerouslySetInnerHTML={{ __html: event.acf.event_details }} sx={{ color: '#494947' }} />
      <EventsDialog event={event} />
    </Container>
  );
};
interface EventContainerProps {
  imageUrl: string;
}

const EventContainer = ({ imageUrl }: EventContainerProps) => {
  return (
    <Card
      className="landing-product__item-inner"
      sx={{
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      <FeedLikeIcon />
    </Card>
  );
};

export default EventDetailsPage;
