import { BrandDetails } from '@/interfaces/brand';
import { Box, Card } from '@mui/material';
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
      {brandLogo && (
        <Box className="brand-logo">
          <Image src={brandLogo} alt="brand logo" fill sizes="(max-width: 1000px) 100vw, 1000px" />
        </Box>
      )}
    </Card>
  );
};

export default DetailPageImageContainer;
