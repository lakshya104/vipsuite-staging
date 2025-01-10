import React from 'react';
import { Box, Grid } from '@mui/material';
import EventCard from './EventCard';
import { Event } from '@/interfaces/events';
import { partition } from 'lodash';
import CustomPagination from '../CustomPagination';
import '../CustomStepper/CustomStepper.scss';

interface EventListingProps {
  events: Event[];
  totalPages: number;
  currentPage: number;
}

const EventsListing: React.FC<EventListingProps> = ({ events, currentPage, totalPages }) => {
  const [featuredEvents, nonFeaturedEvents] = partition(events, (event) => event?.acf?.is_featured);
  return (
    <>
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
      {totalPages > 1 && (
        <Box className="custom-stepper">
          <CustomPagination currentPage={currentPage} totalPages={totalPages} />
        </Box>
      )}
    </>
  );
};

export default EventsListing;
