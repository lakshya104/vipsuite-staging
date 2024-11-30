import React from 'react';
import { ProgressBarLink } from './ProgressBar';
import { Card, CardContent, Typography } from '@mui/material';
import { first, isUndefined } from 'lodash';
import he from 'he';
import { Opportunity } from '@/interfaces/opportunities';

interface OpportunityCardProps {
  opportunity: Opportunity;
  image: string;
  isFeatured: boolean;
}
const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity, image, isFeatured }) => {
  return (
    <ProgressBarLink href={`/opportunities/${opportunity.id}`}>
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
              Featured Opportunity
            </Typography>
          )}
          <Typography variant="h2"> {he.decode(opportunity?.title?.rendered)}</Typography>
        </CardContent>
      </Card>
    </ProgressBarLink>
  );
};

export default OpportunityCard;
