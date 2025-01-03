import React, { useEffect, useState } from 'react';
import { DashboardItem } from '@/interfaces';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { first, isUndefined } from 'lodash';
import he from 'he';
import { formatEventDates, truncateDescription, wrapInParagraph } from '@/helpers/utils';
import { ProgressBarLink } from '../ProgressBar';
import { DefaultImageFallback } from '@/helpers/enums';
import './Dashboard.scss';

interface DashboardCardProps {
  item: DashboardItem;
}

const getImage = (item: DashboardItem) => {
  switch (item.type) {
    case 'product':
      return item.image?.src;
    case 'event':
      return item.acf?.event_image?.sizes?.medium_large;
    case 'opportunity':
      return item.acf?.featured_image?.sizes?.medium_large;
    default:
      return DefaultImageFallback.Placeholder;
  }
};

const DashboardCard: React.FC<DashboardCardProps> = ({ item }) => {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const itemType = item.type;
  const isProduct = itemType === 'product';
  const isEvent = itemType === 'event';
  const isOpportunity = itemType === 'opportunity';
  const brandLogo = item?.acf?.brand_logo?.url;
  const postTitle = he.decode(item?.title?.rendered);
  const postId = item?.id;
  const postPath = isProduct ? 'products' : isEvent ? 'events' : isOpportunity ? 'opportunities' : '';
  const image = getImage(item);
  const featuredLabels = [
    { condition: isEvent && item?.acf?.is_featured, text: 'Featured Event' },
    { condition: isOpportunity && item?.acf?.is_featured, text: 'Featured Opportunity' },
    { condition: isProduct && item?.acf?.is_request_only, text: 'By Request Only' },
    {
      condition: isProduct && item?.acf?.is_featured,
      text: 'Featured Product',
      extraClass: 'dashboard-card__item-featuredProduct',
    },
  ];

  return (
    <ProgressBarLink href={`${postPath}/${postId}`}>
      <Box className="dashboard-card">
        <Image
          src={image || DefaultImageFallback.Placeholder}
          alt={`${postTitle} image`}
          width={600}
          height={400}
          quality={75}
          style={{ objectFit: 'cover', height: '450px' }}
          placeholder="blur"
          blurDataURL={DefaultImageFallback.Placeholder}
          onError={(e) => {
            e.currentTarget.src = DefaultImageFallback.Placeholder;
          }}
        />
        {isOpportunity && !isUndefined(first(item?.['opportunity-category'])) && (
          <Box>
            <Typography className="dashboard-card__item-overline" variant="overline" gutterBottom>
              {first(item?.['opportunity-category'])}
            </Typography>
          </Box>
        )}
        {(isEvent || isProduct) && brandLogo && (
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
          {featuredLabels.map(
            ({ condition, text, extraClass = '' }, index) =>
              condition && (
                <Box key={index} className={`dashboard-card__item-featuredBox ${extraClass}`}>
                  <Typography className="dashboard-card__item-featuredText" variant="overline">
                    {text}
                  </Typography>
                </Box>
              ),
          )}
          {isClient && (
            <>
              <Typography variant="h2" dangerouslySetInnerHTML={{ __html: postTitle || '' }} />
              {isProduct && item?.short_description && (
                <Typography
                  variant="body2"
                  dangerouslySetInnerHTML={{
                    __html: truncateDescription(wrapInParagraph(item?.short_description), 30) || '',
                  }}
                />
              )}
            </>
          )}
          {isEvent && (
            <>
              <Typography variant="body2">
                <Typography component="span" fontWeight={500}>
                  Date:
                </Typography>{' '}
                {formatEventDates(item?.acf?.event_start_date, item?.acf?.event_end_date)}
              </Typography>
              <Typography variant="body2">
                <Typography component="span" fontWeight={500}>
                  Location:
                </Typography>{' '}
                {item?.acf?.event_location}
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </ProgressBarLink>
  );
};

export default DashboardCard;
