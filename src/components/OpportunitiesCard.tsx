import React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import FeedLikeIcon from './FeedLikeIcon';
import { ProgressBarLink } from './ProgressBar';
import { Opportunity } from '@/interfaces/opportunities';
import { map } from 'lodash';

interface OpportunitiesCardProps {
  opportunity: Opportunity[];
}

const OpportunitiesCard: React.FC<OpportunitiesCardProps> = ({ opportunity }) => {
  return (
    <Grid container spacing={2}>
      {map(opportunity, (opportunity) => (
        <Grid item xs={12} sm={6} md={4} key={opportunity.id}>
          <ProgressBarLink href={`/opportunities/${opportunity.id}`}>
            <Card
              className="opportunities-card__item-inner"
              sx={{
                backgroundImage: `url(${opportunity?.acf.featured_image?.link})`,
              }}
            >
              <Typography className="opportunities-card__item-overline" variant="overline" gutterBottom>
                VIP Club
              </Typography>
              <FeedLikeIcon />
              <CardContent className="opportunities-card__item-content">
                <Typography variant="h2">{opportunity?.title?.rendered}</Typography>
                <Typography
                  variant="body2"
                  dangerouslySetInnerHTML={{ __html: opportunity?.['opportunity-category']?.join(' | ') }}
                />
              </CardContent>
            </Card>
          </ProgressBarLink>
        </Grid>
      ))}
    </Grid>
  );
};

export default OpportunitiesCard;
