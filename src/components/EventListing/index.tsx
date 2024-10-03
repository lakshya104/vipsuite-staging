import React from 'react';
import { Grid } from '@mui/material';
import EventCard from './EventCard';
import { Event } from '@/interfaces/events';
import { partition } from 'lodash';

interface EventListingProps {
  events: Event[];
}
const EventsListing: React.FC<EventListingProps> = ({ events }) => {
  const [featuredEvents, nonFeaturedEvents] = partition(events, (event) => event?.acf?.is_featured);
  return (
    <Grid className="landing-product" container spacing={2.8}>
      {featuredEvents.map((item) => (
        <Grid item xs={12} sm={6} lg={4} key={item.id} className="landing-product__item">
          <EventCard item={item} isFeatured={true} />
        </Grid>
      ))}
      {nonFeaturedEvents.map((item) => (
        <Grid item xs={12} sm={6} lg={4} key={item.id} className="landing-product__item">
          <EventCard item={item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default EventsListing;
