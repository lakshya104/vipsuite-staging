import React from 'react';
import { Box, Grid } from '@mui/material';
import EventCard from './EventCard';
import { Event } from '@/interfaces/events';
import CustomPagination from '../CustomPagination';
import '../CustomStepper/CustomStepper.scss';

interface EventListingProps {
  events: Event[];
  totalPages: number;
  currentPage: number;
}

const EventsListing: React.FC<EventListingProps> = ({ events, currentPage, totalPages }) => {
  return (
    <>
      <Grid className="landing-product" container spacing={2.8}>
        {events.map((item) => (
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
