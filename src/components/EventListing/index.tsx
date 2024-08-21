import React from 'react';
import { Grid } from '@mui/material';
import EventCard from './EventCard';
import { Event } from '@/interfaces/events';

interface EventListingProps {
  events: Event[];
}
const EventsListing: React.FC<EventListingProps> = ({ events }) => {
  return (
    <Grid className="landing-product" container spacing={2.5}>
      {events.map((item) => (
        <Grid item xs={12} sm={6} lg={4} key={item.id} className="landing-product__item">
          <EventCard item={item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default EventsListing;
