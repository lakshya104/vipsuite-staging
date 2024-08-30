import React from 'react';
import { Typography, Box, Container } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ProgressBarLink } from '@/components/ProgressBar';
import { GetVipRsvpEvents } from '@/libs/api-manager/manager';
import { get } from 'lodash';
import ErrorToaster from '@/components/ErrorToaster';
import { MyEvent } from '@/interfaces';

const MyEventsPage = async () => {
  let vipRsvpEvents: MyEvent[] | null = null;
  try {
    vipRsvpEvents = await GetVipRsvpEvents();
  } catch (error) {
    const message = get(error, 'message', '');
    if ((message as string) === 'Expired token') {
      return <ErrorToaster message="Please login again to continue" login={true} errorMessage={String(error)} />;
    } else {
      return <ErrorToaster message="Not able to show RSVP Events currently!" errorMessage={String(error)} />;
    }
  }

  if (!vipRsvpEvents || vipRsvpEvents.length === 0) {
    return (
      <Box component={'main'} className="my-events">
        <Container>
          <Typography align="center" variant="h4" marginTop={5}>
            RSVP Events not found.
          </Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box className="order-product__items">
      {vipRsvpEvents.map((event: MyEvent) => (
        <Box
          className="order-product__item"
          key={event.ID}
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Box>
            <Typography gutterBottom variant="h2">
              {event?.post_title}
            </Typography>
            <Typography variant="body1">{event?.acf?.event_start_date}</Typography>
            {/* <Typography variant="body1">Time: {order.time}</Typography> */}
            <Typography variant="body1">Location: {event?.acf?.event_location}</Typography>
          </Box>
          <ProgressBarLink href={`/my-events/${event?.ID}`}>
            <ArrowForwardIcon />
          </ProgressBarLink>
        </Box>
      ))}
    </Box>
  );
};

export default MyEventsPage;
