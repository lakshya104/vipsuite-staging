import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import FeedLikeIcon from '../FeedLikeIcon';
import { Brand } from '@/interfaces/brand';
import { ProgressBarLink } from '../ProgressBar';

interface BrandCardProps {
  item: Brand;
}

const BrandCard: React.FC<BrandCardProps> = ({ item }) => {
  return (
    <Card
      className="landing-product__item-inner"
      sx={{
        backgroundImage: `url(${item.acf?.brand_image.url})`,
      }}
    >
      <FeedLikeIcon />
      <ProgressBarLink href={`/brands/${item.id}`}>
        {' '}
        <CardContent className="landing-product__item-content">
          <Typography variant="h2">{item?.title?.rendered}</Typography>
          {item.acf && (
            <Typography variant="body2" mb={2}>
              {item.acf.short_description}
            </Typography>
          )}
          <Typography variant="body2">{item['brand-category'].join(' | ')}</Typography>
        </CardContent>
      </ProgressBarLink>
    </Card>
  );
};

export default BrandCard;
