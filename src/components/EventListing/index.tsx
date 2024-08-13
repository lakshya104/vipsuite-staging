import React from 'react';
import { GetVipEvents } from '@/libs/api-manager/manager';
import { Grid } from '@mui/material';
import { Event } from '@/interfaces/enents';
import EventCard from './EventCard';

const EventsListing = async () => {
  const events: Event[] = await GetVipEvents();
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
