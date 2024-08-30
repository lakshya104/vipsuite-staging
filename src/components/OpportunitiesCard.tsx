import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import FeedLikeIcon from './FeedLikeIcon';
import { ProgressBarLink } from './ProgressBar';
import { Opportunity } from '@/interfaces/opportunities';

interface OpportunitiesCardProps {
  opportunity: Opportunity;
}

const OpportunitiesCard: React.FC<OpportunitiesCardProps> = ({ opportunity }) => {
  return (
    <Card
      className="opportunities-card__item-inner"
      sx={{
        backgroundImage: `url(${opportunity?.acf.featured_image?.link})`,
      }}
    >
      <Typography
        className='opportunities-card__item-overline'
        variant="overline"
        gutterBottom
      >
        VIP Clup
      </Typography>
      <FeedLikeIcon />
      <ProgressBarLink href={`/opportunities/${opportunity.id}`}>
        <CardContent className="opportunities-card__item-content">
          <Typography variant="h2">{opportunity?.title?.rendered}</Typography>
          <Typography variant="body2">{opportunity?.['opportunity-category']?.join('|')}</Typography>
        </CardContent>
      </ProgressBarLink>
    </Card>
  );
};

export default OpportunitiesCard;
