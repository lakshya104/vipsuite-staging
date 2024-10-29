import React from 'react';
import { Typography, Box } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ProgressBarLink } from '@/components/ProgressBar';
import { GetVipRsvpEvents } from '@/libs/api-manager/manager';
import { MyEvent } from '@/interfaces';
import { formatDate } from '@/helpers/utils';
import ErrorFallback from '@/components/ErrorFallback';

const MyEventsPage = async () => {
  const vipRsvpEvents: MyEvent[] = await GetVipRsvpEvents();
  if (!vipRsvpEvents || vipRsvpEvents.length === 0) {
    return <ErrorFallback errorMessage="No upcoming events found." hideSubtext={true} />;
  }
  return (
    <Box className="order-product__items">
      {vipRsvpEvents.map((event: MyEvent) => (
        <ProgressBarLink href={`/my-events/${event?.ID}`} key={event?.ID}>
          <Box className="order-product__item" display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Box>
              <Typography gutterBottom variant="h2">
                {event?.post_title}
              </Typography>
              <Typography variant="body1">{formatDate(event?.acf?.event_start_date)}</Typography>
              <Typography variant="body1">Location: {event?.acf?.event_location}</Typography>
            </Box>
            <ArrowForwardIcon />
          </Box>
        </ProgressBarLink>
      ))}
    </Box>
  );
};

export default MyEventsPage;
