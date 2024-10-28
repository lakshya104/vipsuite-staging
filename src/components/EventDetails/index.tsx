import React from 'react';
import { Box, Card, Typography } from '@mui/material';
import Image from 'next/image';
import he from 'he';
import { EventDetails } from '@/interfaces/events';
import EventsDialog from '../EventDialog';
import './EventDetails.scss';
import { formatDateWithOrdinal, wrapInParagraph } from '@/helpers/utils';
import { DefaultImageFallback } from '@/helpers/enums';

interface EventDetailsCardProps {
  event: EventDetails;
}

const EventDetailsCard: React.FC<EventDetailsCardProps> = ({ event }) => {
  const eventDetail = wrapInParagraph(event?.acf?.event_details);

  return (
    <Box className="product-detail">
      <Typography className="page-title" variant="h2" component="h1" align="center">
        {he.decode(event?.title?.rendered)}
      </Typography>
      <EventContainer event={event} />
      <Box className="product-detail__content">
        <Typography
          sx={{
            fontSize: { xs: '13px', md: '16px' },
            fontWeight: 400,
            lineHeight: '15.08px',
            letterSpacing: '-0.01em',
            marginBottom: { xs: '5px', md: '10px' },
          }}
        >
          {event?.acf?.brand_name}
        </Typography>
        <Typography variant="h2" gutterBottom>
          {he.decode(event?.title?.rendered)}
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
      <EventsDialog event={event}  />
    </Box>
  );
};

interface EventContainerProps {
  event: EventDetails;
}

const EventContainer = ({ event }: EventContainerProps) => {
  const eventImageUrl = event?.acf?.event_image?.sizes?.['large-2x'] || DefaultImageFallback.Placeholder;
  const brandLogo = event?.acf?.brand_logo?.url;

  return (
    <Card
      className="product-detail__item"
      sx={{
        backgroundImage: `url(${eventImageUrl})`,
      }}
    >
      {brandLogo && (
        <Box className="brand-logo">
          <Image src={brandLogo} alt="brand logo" fill sizes="(max-width: 1000px) 100vw, 1000px" />
        </Box>
      )}
    </Card>
  );
};

export default EventDetailsCard;
