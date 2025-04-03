import React from 'react';
import { Grid2 } from '@mui/material';
import EventCard from './EventCard';
import { Event } from '@/interfaces/events';
import '../CustomStepper/CustomStepper.scss';
import { partition } from 'lodash';

interface EventListingProps {
  events: Event[];
}

const EventsListing: React.FC<EventListingProps> = ({ events }) => {
  const [featuredEvents, nonFeaturedEvents] = partition(events, (event) => event?.acf?.is_featured);
  const sortedEvents = [...featuredEvents, ...nonFeaturedEvents];
  return (
    <>
      <Grid2 className="landing-product" container spacing={2.8}>
        {sortedEvents.map((item) => (
          <Grid2 size={{ xs: 12, sm: 6, lg: 4 }} key={item.id} className="landing-product__item">
            <EventCard item={item} />
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};

export default EventsListing;
