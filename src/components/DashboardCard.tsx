import React from 'react';
import { DashboardItem } from '@/interfaces';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { formatEventDates, truncateDescription } from '@/helpers/utils';
import { ProgressBarLink } from './ProgressBar';
import FeedLikeIcon from './FeedLikeIcon';
import { Brand } from '@/interfaces/brand';
import { Event } from '@/interfaces/events';
import { Opportunity } from '@/interfaces/opportunities';

interface DashboardCardProps {
  item: DashboardItem;
  token: string;
  vipId: number | string | undefined;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ item, token, vipId }) => {
  const isBrand = (item as Brand)?.type === 'brand-profile';
  const isEvent = (item as Event)?.type === 'event';
  const isOpportunity = (item as Opportunity)?.type === 'opportunity';
  const EventImage = (item as Event)?.acf?.event_image?.sizes?.medium_large;
  const BrandImage = (item as Brand)?.acf?.brand_image?.sizes?.medium_large;
  const OpportunityImage = (item as Opportunity)?.acf?.featured_image?.sizes?.medium_large;
  const brandLogo = (item as Brand)?.acf?.brand_logo?.url;
  const isWishlisted = item?.is_wishlisted;
  const postTitle = item?.title?.rendered;
  const postId = item?.id;
  const postPath = isBrand ? 'brands' : isEvent ? 'events' : isOpportunity ? 'opportunities' : '';
  const image = isBrand
    ? BrandImage
    : isEvent
      ? EventImage
      : isOpportunity
        ? OpportunityImage
        : '/img/placeholder-image.jpg';

  return (
    <ProgressBarLink href={`/${postPath}/${postId}`}>
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '4px',
        }}
      >
        <Image
          src={image || '/img/placeholder-image.jpg'}
          alt={postTitle || 'Image'}
          width={600}
          height={400}
          quality={75}
          style={{ objectFit: 'cover', height: 'auto', width: 'auto', minHeight: '440px' }}
          placeholder="blur"
          blurDataURL="/img/image-placeholder.png"
        />
        <FeedLikeIcon isWishlisted={isWishlisted} postId={postId} type={item.type} token={token} vipId={vipId} />
        {isBrand && brandLogo && (
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              width: 60,
              height: 60,
              overflow: 'hidden',
            }}
          >
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
        <Box
          className="landing-product__text"
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            p: 2,
            color: 'white',
          }}
        >
          {isEvent && (item as Event)?.acf?.is_featured && (
            <Box sx={{ mb: 1, fontWeight: 'bold' }}>
              <Typography className="featured-event" variant="overline">
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
                <Typography component="span" sx={{ fontWeight: '500' }}>
                  Date:
                </Typography>{' '}
                {formatEventDates((item as Event)?.acf?.event_start_date, (item as Event)?.acf?.event_end_date)}
              </Typography>
              <Typography variant="body2">
                <Typography component="span" sx={{ fontWeight: '500' }}>
                  Location:
                </Typography>{' '}
                {(item as Event)?.acf?.event_location}
              </Typography>
            </>
          )}
          {isBrand && (
            <Typography variant="body2">
              {(item as Brand)['brand-category']?.map((category, index) => (
                <span key={index}>
                  {category}
                  {index < (item as Brand)['brand-category']?.length - 1 && <span className="home-separator"> | </span>}
                </span>
              ))}
            </Typography>
          )}
          {isEvent && (
            <Typography variant="body2">
              {(item as Event)['event-category']?.map((category, index) => (
                <span key={index}>
                  {category}
                  {index < (item as Event)['event-category']?.length - 1 && <span className="home-separator"> | </span>}
                </span>
              ))}
            </Typography>
          )}
          {isOpportunity && (
            <Typography
              variant="body2"
              className="landing-product__paragraph"
              dangerouslySetInnerHTML={{
                __html: (item as Opportunity)['opportunity-category']?.join(' <span>|</span> '),
              }}
            />
          )}
        </Box>
      </Box>
    </ProgressBarLink>
  );
};

export default DashboardCard;
