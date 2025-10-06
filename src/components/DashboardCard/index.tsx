import React, { useEffect, useState } from 'react';
import { DashboardItem } from '@/interfaces';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { first, isUndefined } from 'lodash';
import he from 'he';
// import { formatEventDates } from '@/helpers/utils';
import { ProgressBarLink } from '../ProgressBar';
import { DefaultImageFallback, PostType } from '@/helpers/enums';
import './Dashboard.scss';
import { paths } from '@/helpers/paths';
import en from '@/helpers/lang';

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
  const isEvent = itemType === PostType.Event;
  const isOpportunity = itemType === PostType.Opportunity;
  const brandLogo = item?.acf?.brand_logo?.url;
  const postTitle = he.decode(item?.title?.rendered);
  const postId = item?.id;
  const image = getImage(item);
  const featuredLabels = [
    { condition: isEvent && item?.acf?.is_featured, text: en.common.featuredTag },
    { condition: isOpportunity && item?.acf?.is_featured, text: en.common.featuredTag },
  ];
  let href: string;
  switch (itemType) {
    case PostType.Opportunity:
      href = paths.root.opportunityDetails.getHref(postId);
      break;
    case PostType.Event:
      href = paths.root.eventDetails.getHref(postId);
      break;
    // case PostType.Product:
    //   href = paths.root.productDetails.getHref(postId);
    //   break;
    default:
      href = paths.root.home.getHref();
      break;
  }

  return (
    <ProgressBarLink href={href}>
      <Box className="dashboard-card">
        <Image
          src={image || DefaultImageFallback.Placeholder}
          alt={`${postTitle} image`}
          width={600}
          height={400}
          quality={75}
          style={{ minHeight: '372px', height: 'auto' }}
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
        {isEvent && brandLogo && (
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
            ({ condition, text }, index) =>
              condition && (
                <Box key={index} className={`dashboard-card__item-featuredBox`}>
                  <Typography className="dashboard-card__item-featuredText" variant="overline">
                    {text}
                  </Typography>
                </Box>
              ),
          )}
          {isClient && <Typography variant="h2" dangerouslySetInnerHTML={{ __html: postTitle || '' }} />}
          {isEvent && (
            <>
              {(item?.acf?.event_start_date || item?.acf?.event_end_date) && (
                <Typography variant="body2">
                  <Typography component="span" sx={{ fontWeight: '500', color: 'white !important' }}>
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
                <Typography variant="body2">
                  <Typography component="span" sx={{ fontWeight: '500', color: 'white !important' }}>
                    Location:
                  </Typography>{' '}
                  {item.acf.event_location}
                </Typography>
              )}
            </>
          )}
        </Box>
      </Box>
    </ProgressBarLink>
  );
};

export default DashboardCard;
