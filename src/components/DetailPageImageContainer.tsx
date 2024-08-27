import { BrandDetails } from '@/interfaces/brand';
import { Card } from '@mui/material';
import React from 'react';
import FeedLikeIcon from './FeedLikeIcon';

const DetailPageImageContainer = ({ item }: { item: BrandDetails }) => {
  return (
    <Card
      className="product-detail__item"
      sx={{
        backgroundImage: `url(${item.acf.brand_image.sizes.large})`,
      }}
    >
      <FeedLikeIcon />
    </Card>
  );
};

export default DetailPageImageContainer;
