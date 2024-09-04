import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import FeedLikeIcon from '../FeedLikeIcon';
import { Event } from '@/interfaces/events';
import { ProgressBarLink } from '../ProgressBar';
import { formatDateWithOrdinal } from '@/helpers/utils';

interface EventCardProps {
  item: Event;
}

const EventCard: React.FC<EventCardProps> = ({ item }) => {
  return (
    <ProgressBarLink href={`/events/${item.id}`}>
      <Card
        className="landing-product__item-inner"
        sx={{
          backgroundImage: `url(${item.acf.event_image.sizes.large})`,
        }}
      >
        <FeedLikeIcon />
        <CardContent className="landing-product__item-content">
          <Typography variant="h2" dangerouslySetInnerHTML={{ __html: item?.title?.rendered }} />
          <Typography variant="body2">
            <Typography component="span" sx={{ fontWeight: '500' }}>
              Date:
            </Typography>{' '}
            {formatDateWithOrdinal(item?.acf?.event_start_date, false)} -
            {formatDateWithOrdinal(item?.acf?.event_end_date, true)}
          </Typography>
          <Typography variant="body2">
            <Typography component="span" sx={{ fontWeight: '500' }}>
              Location:
            </Typography>{' '}
            {item.acf.event_location}
          </Typography>
          <Typography variant="body2">{item['event-category'].join(' | ')}</Typography>
        </CardContent>
      </Card>
    </ProgressBarLink>
  );
};

export default EventCard;
