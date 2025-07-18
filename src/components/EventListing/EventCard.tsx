import React from 'react';
import Image from 'next/image';
import { Box, Card, CardContent, Typography } from '@mui/material';
import he from 'he';
import { Event } from '@/interfaces/events';
import { ProgressBarLink } from '../ProgressBar';
// import { formatEventDates } from '@/helpers/utils';
import { DefaultImageFallback, PostType } from '@/helpers/enums';
import en from '@/helpers/lang';
import { paths, withSearchParams } from '@/helpers/paths';

interface EventCardProps {
  item: Event;
}

const EventCard: React.FC<EventCardProps> = ({ item }) => {
  const isFeatured = item?.acf?.is_featured;
  const brandLogo = item.acf?.brand_logo?.url;
  const eventImage = item?.acf?.event_image?.sizes?.['vs-container-half'] || DefaultImageFallback.Placeholder;
  const href = item?.isBrandCard
    ? withSearchParams(() => paths.root.brandDetails.getHref(item?.acf?.brand_id), { type: PostType.Event })
    : paths.root.eventDetails.getHref(item.id);
  return (
    <ProgressBarLink href={href}>
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
        <CardContent className="landing-product__item-content">
          {isFeatured && (
            <Box className="category-label">
              <Typography variant="overline" color="black" display="block">
                {en.events.featuredTag}
              </Typography>
            </Box>
          )}
          <Typography variant="h2" dangerouslySetInnerHTML={{ __html: he.decode(item?.title?.rendered || '') || '' }} />
          {(item?.acf?.event_start_date || item?.acf?.event_end_date) && (
            <Typography variant="body2" sx={{ color: 'white !important' }}>
              <Typography component="span" sx={{ fontWeight: '500' }}>
                {en.events.date}
              </Typography>{' '}
              <>
                {item?.acf?.event_start_date && item.acf.event_start_date}
                {item?.acf?.event_start_date && item?.acf?.event_end_date && ' - '}
                {item?.acf?.event_end_date && item.acf.event_end_date}
              </>
            </Typography>
          )}
          {item?.acf?.event_location && item.acf.event_location.trim() !== '' && (
            <Typography variant="body2" color="white !important">
              <Typography component="span" sx={{ fontWeight: '500' }}>
                {en.events.location}
              </Typography>{' '}
              {item.acf.event_location}
            </Typography>
          )}
        </CardContent>
      </Card>
    </ProgressBarLink>
  );
};

export default EventCard;
