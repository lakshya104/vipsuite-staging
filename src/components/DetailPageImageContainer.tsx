import { BrandDetails } from '@/interfaces/brand';
import { Card } from '@mui/material';
import React from 'react';
import FeedLikeIcon from './FeedLikeIcon';

const DetailPageImageContainer = ({ item }: { item: BrandDetails }) => {
  const productImage = item?.acf?.brand_image?.sizes?.large || '/img/placeholder-image.jpg';
  return (
    <Card
      className="product-detail__item"
      sx={{
        backgroundImage: `url(${productImage})`,
      }}
    >
      <FeedLikeIcon />
    </Card>
  );
};

export default DetailPageImageContainer;
