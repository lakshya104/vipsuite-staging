import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import FeedLikeIcon from '../FeedLikeIcon';
import { Event } from '@/interfaces/events';
import { ProgressBarLink } from '../ProgressBar';

interface EventCardProps {
  item: Event;
}

const EventCard: React.FC<EventCardProps> = ({ item }) => {
  return (
    <Card
      className="landing-product__item-inner"
      sx={{
        backgroundImage: `url(${item.acf.event_image.sizes.large})`,
      }}
    >
      <FeedLikeIcon />
      <ProgressBarLink href={`/events/${item.id}`}>
        <CardContent className="landing-product__item-content">
          <Typography variant="h2">{item?.title.rendered}</Typography>
          <Typography variant="body2">
            <Typography component="span" sx={{ fontWeight: '500' }}>
              Date:
            </Typography>{' '}
            {item.acf.event_start_date} - {item.acf.event_end_date}
          </Typography>
          <Typography variant="body2">
            <Typography component="span" sx={{ fontWeight: '500' }}>
              Location:
            </Typography>{' '}
            {item.acf.event_location}
          </Typography>
          <Typography variant="body2">{item['event-category'].join(' | ')}</Typography>
        </CardContent>
      </ProgressBarLink>
    </Card>
  );
};

export default EventCard;
