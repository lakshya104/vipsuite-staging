import React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { ProgressBarLink } from './ProgressBar';
import { Opportunity } from '@/interfaces/opportunities';
import { map } from 'lodash';
import FeedLikeIcon from './FeedLikeIcon';
import { useUserInfoStore } from '@/store/useStore';

interface OpportunitiesCardProps {
  opportunities: Opportunity[];
  token: string;
  vipId: number;
}

const OpportunitiesCard: React.FC<OpportunitiesCardProps> = ({ opportunities, token, vipId }) => {
  const { userRoleStore } = useUserInfoStore();
  return (
    <Grid container spacing={2} sx={{ mb: 5 }}>
      {map(opportunities, (opportunity) => {
        const opportunityDetailLink =
          userRoleStore === 'vip' ? `/opportunities/${opportunity.id}` : `/agent-opportunities/${opportunity.id}`;
        return (
          <Grid item xs={12} sm={6} md={4} key={opportunity.id}>
            <ProgressBarLink href={opportunityDetailLink}>
              <Card
                className="opportunities-card__item-inner"
                sx={{
                  backgroundImage: `url(${opportunity?.acf.featured_image?.link})`,
                }}
              >
                <FeedLikeIcon
                  postId={opportunity?.id}
                  isWishlisted={opportunity?.is_wishlisted}
                  type="opportunity"
                  token={token}
                  vipId={vipId}
                />
                <Typography className="opportunities-card__item-overline" variant="overline" gutterBottom>
                  VIP Club
                </Typography>
                <CardContent className="opportunities-card__item-content">
                  <Typography variant="h2">{opportunity?.title?.rendered}</Typography>
                  <Typography
                    variant="body2"
                    dangerouslySetInnerHTML={{
                      __html: opportunity?.['opportunity-category']?.join(' <span>|</span> '),
                    }}
                  />
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
