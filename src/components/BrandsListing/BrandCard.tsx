import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import FeedLikeIcon from '../FeedLikeIcon';
import Link from 'next/link';
import { Brand } from '@/interfaces/brand';

interface BrandCardProps {
  item: Brand;
}

const BrandCard: React.FC<BrandCardProps> = ({ item }) => {
  return (
    <Card
      className="landing-product__item-inner"
      sx={{
        backgroundImage: `url(/img/bodaSkins.png)`,
      }}
    >
      <FeedLikeIcon />
      <Link href={`/brands/${item.id}`}>
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
      </Link>
    </Card>
  );
};

export default BrandCard;
