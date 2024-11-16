import React from 'react';
import { first, isUndefined, map } from 'lodash';
import he from 'he';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { ProgressBarLink } from './ProgressBar';
import { Opportunity } from '@/interfaces/opportunities';
import { DefaultImageFallback } from '@/helpers/enums';

interface OpportunitiesCardProps {
  opportunities: Opportunity[];
}

const OpportunitiesCard: React.FC<OpportunitiesCardProps> = ({ opportunities }) => {
  return (
    <Grid container spacing={2} sx={{ mb: 5 }}>
      {map(opportunities, (opportunity) => {
        const image = opportunity?.acf.featured_image?.link || DefaultImageFallback.Placeholder;
        return (
          <Grid item xs={12} sm={6} md={4} key={opportunity.id}>
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
                  <Typography variant="h2"> {he.decode(opportunity?.title?.rendered)}</Typography>
                </CardContent>
              </Card>
            </ProgressBarLink>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default OpportunitiesCard;
