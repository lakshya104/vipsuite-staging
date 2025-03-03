import React from 'react';
import { ProgressBarLink } from './ProgressBar';
import { Card, CardContent, Typography } from '@mui/material';
import { first, isUndefined } from 'lodash';
import he from 'he';
import { Opportunity } from '@/interfaces/opportunities';
import en from '@/helpers/lang';
import { paths, withSearchParams } from '@/helpers/paths';
import { PostType } from '@/helpers/enums';

interface OpportunityCardProps {
  opportunity: Opportunity;
  image: string;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity, image }) => {
  const isFeatured = opportunity?.acf?.is_featured;
  const href = opportunity?.isBrandCard
    ? withSearchParams(() => paths.root.brandDetails.getHref(opportunity?.acf?.brand_id), {
        type: PostType.Opportunity,
      })
    : paths.root.opportunityDetails.getHref(opportunity?.id);
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
          <Typography variant="h2"> {he.decode(opportunity?.title?.rendered || '')}</Typography>
        </CardContent>
      </Card>
    </ProgressBarLink>
  );
};

export default OpportunityCard;
