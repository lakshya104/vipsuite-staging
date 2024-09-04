import React from 'react';
import { Box, Card, Typography } from '@mui/material';
import FeedLikeIcon from '@/components/FeedLikeIcon';
import { EventDetails } from '@/interfaces/events';
import EventsDialog from '../EventDialog';
import './EventDetails.scss';
import { formatDateWithOrdinal, wrapInParagraph } from '@/helpers/utils';

interface EventDetailsCardProps {
  event: EventDetails;
  token: string;
}

const EventDetailsCard: React.FC<EventDetailsCardProps> = ({ event, token }) => {
  const eventImageUrl = event?.acf?.event_image?.sizes?.['large-2x'] || '/img/placeholder-image.jpg';
  const eventDetail = wrapInParagraph(event?.acf?.event_details);
  return (
    <Box className="product-detail">
      <Typography className="page-title" variant="h2" component="h1" align="center">
        {event?.title?.rendered}
      </Typography>
      <EventContainer imageUrl={eventImageUrl} />
      <Box className="product-detail__content">
        <Typography variant="h2" gutterBottom>
          {event?.title?.rendered}
        </Typography>
        <Typography variant="body1">
          <Box component="strong">Date:</Box> {formatDateWithOrdinal(event?.acf?.event_start_date, false)} -
          {formatDateWithOrdinal(event?.acf?.event_end_date, true)}
        </Typography>
        <Typography variant="body1" paragraph>
          <Box component="strong">Location:</Box> {event?.acf?.event_location}
        </Typography>
        <Typography variant="h6" component="h3" gutterBottom>
          Quick Overview
        </Typography>
        <Typography variant="body1" paragraph>
          {event?.acf?.event_quick_overview}
        </Typography>
        <Typography variant="h6" component="h3" gutterBottom>
          Details
        </Typography>
        <Box dangerouslySetInnerHTML={{ __html: eventDetail || '' }} />
      </Box>
      <EventsDialog event={event} token={token} />
    </Box>
  );
};

interface EventContainerProps {
  imageUrl: string;
}

const EventContainer = ({ imageUrl }: EventContainerProps) => {
  return (
    <Card
      className="product-detail__item"
      sx={{
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      <FeedLikeIcon />
    </Card>
  );
};

export default EventDetailsCard;
