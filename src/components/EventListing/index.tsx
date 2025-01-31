import React from 'react';
import { Grid2 } from '@mui/material';
import EventCard from './EventCard';
import { Event } from '@/interfaces/events';
import '../CustomStepper/CustomStepper.scss';

interface EventListingProps {
  events: Event[];
}

const EventsListing: React.FC<EventListingProps> = ({ events }) => {
  const uniqueEvents: Event[] = [];
  const mappedBrandIds = new Set();
  const countMap: Record<number, number> = {};

  events.forEach((item) => {
    const brandId = item.acf.brand_id;
    if (brandId) {
      countMap[brandId] = (countMap[brandId] || 0) + 1;
    }
  });

  events.forEach((item) => {
    const brandId = item.acf.brand_id;
    if (brandId) {
      item.isBrandCard = countMap[brandId] >= 2;
      if (!mappedBrandIds.has(brandId)) {
        mappedBrandIds.add(brandId);
        uniqueEvents.push(item);
      }
    } else {
      item.isBrandCard = false;
      uniqueEvents.push(item);
    }
  });

  return (
    <>
      <Grid2 className="landing-product" container spacing={2.8}>
        {uniqueEvents.map((item) => (
          <Grid2 size={{ xs: 12, sm: 6, lg: 4 }} key={item.id} className="landing-product__item">
            <EventCard item={item} />
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};

export default EventsListing;
