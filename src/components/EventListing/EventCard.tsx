import { Box, Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import FeedLikeIcon from '../FeedLikeIcon';
import { Event } from '@/interfaces/events';
import { ProgressBarLink } from '../ProgressBar';
import { formatEventDates } from '@/helpers/utils';
import Image from 'next/image';
import { useUserInfoStore } from '@/store/useStore';

interface EventCardProps {
  item: Event;
  isFeatured?: boolean;
  token: string;
  vipId: number;
}

const EventCard: React.FC<EventCardProps> = ({ item, isFeatured, token, vipId }) => {
  const { userRoleStore } = useUserInfoStore();
  const eventDetailLink = userRoleStore === 'vip' ? `/events/${item.id}` : `/agent-events/${item.id}`;
  const brandLogo = item.acf?.brand_logo?.url;
  const eventImage = item?.acf?.event_image?.sizes?.large || '/img/placeholder-image.jpg';
  return (
    <ProgressBarLink href={eventDetailLink}>
      <Card
        className="landing-product__item-inner"
        sx={{
          backgroundImage: `url(${eventImage})`,
        }}
      >
        {brandLogo && (
          <Box className="brand-logo">
            <Image src={brandLogo} alt="brand logo" fill sizes="(max-width: 199px) 100vw, 199px" />
          </Box>
        )}
        <FeedLikeIcon isWishlisted={item?.is_wishlisted} postId={item?.id} type="event" vipId={vipId} token={token} />
        <CardContent className="landing-product__item-content">
          {isFeatured && (
            <Box className="category-label">
              <Typography variant="overline" color="black" display="block">
                Featured Event
              </Typography>
            </Box>
          )}
          <Typography variant="h2" dangerouslySetInnerHTML={{ __html: item?.title?.rendered || '' }} />
          <Typography variant="body2">
            <Typography component="span" sx={{ fontWeight: '500' }}>
              Date:
            </Typography>{' '}
            {formatEventDates(item?.acf?.event_start_date, item?.acf?.event_end_date)}
          </Typography>
          <Typography variant="body2">
            <Typography component="span" sx={{ fontWeight: '500' }}>
              Location:
            </Typography>{' '}
            {item.acf.event_location}
          </Typography>
          <Typography variant="body2">
            {item['event-category']?.map((category, index) => (
              <span key={index}>
                {category}
                {index < item['event-category'].length - 1 && <span className="event-separator"> | </span>}
              </span>
            ))}
          </Typography>
        </CardContent>
      </Card>
    </ProgressBarLink>
  );
};

export default EventCard;
