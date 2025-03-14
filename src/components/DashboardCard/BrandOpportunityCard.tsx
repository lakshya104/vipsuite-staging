'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import he from 'he';
import { ProgressBarLink } from '../ProgressBar';
import { DefaultImageFallback, PostType } from '@/helpers/enums';
import './Dashboard.scss';
import { Post } from '@/interfaces/brand';
import { first } from 'lodash';
import { formatEventDates } from '@/helpers/utils';
import { paths } from '@/helpers/paths';

interface BrandOpportunityCardProps {
  opportunity: Post;
  type: PostType;
}

const BrandOpportunityCard: React.FC<BrandOpportunityCardProps> = ({ type, opportunity }) => {
  const image = opportunity?.acf?.featured_image?.sizes?.['vs-container-half'];
  const title = opportunity?.title?.rendered;
  const isFeatured = opportunity?.acf?.is_featured;
  const category = first(opportunity?.opportunity_category);
  const id = opportunity?.ID;
  let href: string;
  switch (type) {
    case PostType.Opportunity:
      href = paths.root.opportunityDetails.getHref(id);
      break;
    case PostType.Event:
      href = paths.root.eventDetails.getHref(id);
      break;
    default:
      href = paths.root.home.getHref();
      break;
  }

  return (
    <ProgressBarLink href={href}>
      <Box className="dashboard-card">
        <Image
          src={image || DefaultImageFallback.Placeholder}
          alt={`post image`}
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

        {category && type === PostType.Opportunity && (
          <Box>
            <Typography className="dashboard-card__item-overline" variant="overline" gutterBottom>
              {category}
            </Typography>
          </Box>
        )}

        <Box className="dashboard-card__item-featured">
          {isFeatured && (
            <Box className="dashboard-card__item-featuredBox">
              <Typography className="dashboard-card__item-featuredText" variant="overline">
                {type === PostType.Opportunity
                  ? 'Featured Opportunity'
                  : type === PostType.Event
                    ? 'Featured Event'
                    : 'Featured Product'}
              </Typography>
            </Box>
          )}
          <Typography variant="h2">{he.decode(title || '')}</Typography>
          {type === PostType.Event && (
            <>
              {opportunity.acf.event_start_date && opportunity?.acf?.event_end_date && (
                <Typography variant="body2">
                  <Typography component="span" fontWeight={500}>
                    Date:
                  </Typography>{' '}
                  {formatEventDates(opportunity?.acf?.event_start_date, opportunity?.acf?.event_end_date)}
                </Typography>
              )}
              <Typography variant="body2">
                <Typography component="span" fontWeight={500}>
                  Location:
                </Typography>{' '}
                {opportunity?.acf?.event_location}
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </ProgressBarLink>
  );
};

export default BrandOpportunityCard;
