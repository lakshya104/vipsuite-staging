import React from 'react';
import { ProgressBarLink } from './ProgressBar';
import { Card, CardContent, Typography } from '@mui/material';
import { first, isUndefined } from 'lodash';
import he from 'he';
import { Opportunity } from '@/interfaces/opportunities';
import en from '@/helpers/lang';

interface OpportunityCardProps {
  opportunity: Opportunity;
  image: string;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity, image }) => {
  const isFeatured = opportunity?.acf?.is_featured;
  const isBrandCard = opportunity?.isBrandCard || false;
  const href = isBrandCard
    ? `/brand/${opportunity?.acf?.brand_id}?type=opportunity`
    : `/opportunities/${opportunity?.id}`;
  return (
    <ProgressBarLink href={href}>
      <Card
        className="opportunities-card__item-inner"
        sx={{
          backgroundImage: `url(${image})`,
        }}
      >
        {!isUndefined(first(opportunity['opportunity-category'])) && (
          <Typography className="opportunities-card__item-overline" variant="overline" gutterBottom>
            {first(opportunity['opportunity-category'])}
          </Typography>
        )}
        <CardContent className="opportunities-card__item-content">
          {isFeatured && (
            <Typography className="opportunities-card__item-category" marginTop={5} variant="overline" gutterBottom>
              {en.opportunities.featuredTag}
            </Typography>
          )}
          <Typography variant="h2"> {he.decode(opportunity?.title?.rendered)}</Typography>
        </CardContent>
      </Card>
    </ProgressBarLink>
  );
};

export default OpportunityCard;
