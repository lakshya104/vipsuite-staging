import React from 'react';
import { Grid2 } from '@mui/material';
import EventCard from './EventCard';
import { Event } from '@/interfaces/events';
import '../CustomStepper/CustomStepper.scss';

interface EventListingProps {
  events: Event[];
}

const EventsListing: React.FC<EventListingProps> = ({ events }) => {
  return (
    <>
      <Grid2 className="landing-product" container spacing={2.8}>
        {events.map((item) => (
          <Grid2 size={{ xs: 12, sm: 6, lg: 4 }} key={item.id} className="landing-product__item">
            <EventCard item={item} />
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};

export default EventsListing;
