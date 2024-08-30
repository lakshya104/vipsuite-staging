import { BrandDetails } from '@/interfaces/brand';
import { Card } from '@mui/material';
import React from 'react';
import FeedLikeIcon from './FeedLikeIcon';
import Image from 'next/image';

const DetailPageImageContainer = ({ item }: { item: BrandDetails }) => {
  const productImage = item?.acf?.brand_image?.sizes?.large || '/img/placeholder-image.jpg';
  const brandLogo = item.acf?.brand_logo?.url;
  return (
    <Card
      className="product-detail__item"
      sx={{
        backgroundImage: `url(${productImage})`,
      }}
    >
      <FeedLikeIcon />
      {brandLogo && <Image src={brandLogo} width={50} height={50} alt="brand logo" />}
    </Card>
  );
};

export default DetailPageImageContainer;
