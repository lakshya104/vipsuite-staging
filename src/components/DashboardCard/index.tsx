import React from 'react';
import { DashboardItem } from '@/interfaces';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { formatEventDates, truncateDescription } from '@/helpers/utils';
import { ProgressBarLink } from '../ProgressBar';
import { Brand } from '@/interfaces/brand';
import { Event } from '@/interfaces/events';
import { Opportunity } from '@/interfaces/opportunities';
import { DefaultImageFallback } from '@/helpers/enums';
import './Dashboard.scss';
import { isUndefined } from 'lodash';

interface DashboardCardProps {
  item: DashboardItem;
}

const getImage = (item: DashboardItem) => {
  switch (item.type) {
    case 'brand-profile':
      return (item as Brand).acf?.brand_image?.sizes?.medium_large;
    case 'event':
      return (item as Event).acf?.event_image?.sizes?.medium_large;
    case 'opportunity':
      return (item as Opportunity).acf?.featured_image?.sizes?.medium_large;
    default:
      return DefaultImageFallback.placeholder;
  }
};

const DashboardCard: React.FC<DashboardCardProps> = ({ item }) => {
  const itemType = item.type;
  const isBrand = itemType === 'brand-profile';
  const isEvent = itemType === 'event';
  const isOpportunity = itemType === 'opportunity';
  const brandLogo = ((item as Brand) || (item as Event))?.acf?.brand_logo?.url;
  const postTitle = item?.title?.rendered;
  const postId = item?.id;
  const postPath = isBrand ? 'brands' : isEvent ? 'events' : isOpportunity ? 'opportunities' : '';
  const image = getImage(item);

  return (
    <ProgressBarLink href={`${postPath}/${postId}`}>
      <Box className="dashboard-card">
        <Image
          src={image || DefaultImageFallback.placeholder}
          alt={`${postTitle} image`}
          width={600}
          height={400}
          quality={75}
          style={{ objectFit: 'cover', height: '450px' }}
          placeholder="blur"
          blurDataURL={DefaultImageFallback.placeholder}
          onError={(e) => {
            e.currentTarget.src = DefaultImageFallback.placeholder;
          }}
        />
        {isOpportunity && !isUndefined((item as Opportunity)['opportunity-category'][0]) && (
          <Box>
            <Typography className="dashboard-card__item-overline" variant="overline" gutterBottom>
              {(item as Opportunity)?.['opportunity-category']?.[0]}
            </Typography>
          </Box>
        )}
        {(isBrand || isEvent) && brandLogo && (
          <Box className="dashboard-card__item-brandImage">
            <Image
              src={brandLogo}
              alt="brand logo"
              sizes="(max-width: 300px) 100vw, 300px"
              style={{ objectFit: 'contain' }}
              priority
              fill
              quality={75}
            />
          </Box>
        )}
        <Box className="dashboard-card__item-featured">
          {isEvent && (item as Event)?.is_featured && (
            <Box className="dashboard-card__item-featuredBox">
              <Typography className="dashboard-card__item-featuredText" variant="overline">
                Featured Event
              </Typography>
            </Box>
          )}
          <Typography variant="h2" dangerouslySetInnerHTML={{ __html: postTitle || '' }} />
          {isBrand && (item as Brand)?.acf?.short_description && (
            <Typography variant="body2">{truncateDescription((item as Brand)?.acf?.short_description, 30)}</Typography>
          )}
          {isEvent && (
            <>
              <Typography variant="body2">
                <Typography component="span" fontWeight={500}>
                  Date:
                </Typography>{' '}
                {formatEventDates((item as Event)?.acf?.event_start_date, (item as Event)?.acf?.event_end_date)}
              </Typography>
              <Typography variant="body2">
                <Typography component="span" fontWeight={500}>
                  Location:
                </Typography>{' '}
                {(item as Event)?.acf?.event_location}
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </ProgressBarLink>
  );
};

export default DashboardCard;
