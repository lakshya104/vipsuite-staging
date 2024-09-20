import { BrandDetails } from '@/interfaces/brand';
import { Box, Card } from '@mui/material';
import React from 'react';
import FeedLikeIcon from './FeedLikeIcon';
import Image from 'next/image';

interface DetailPageImageContainerProps {
  item: BrandDetails;
  token: string;
  vipId: number;
}

const DetailPageImageContainer: React.FC<DetailPageImageContainerProps> = ({ item, token, vipId }) => {
  const productImage = item?.acf?.brand_image?.sizes?.large || '/img/placeholder-image.jpg';
  const brandLogo = item.acf?.brand_logo?.url;
  return (
    <Card
      className="product-detail__item"
      sx={{
        backgroundImage: `url(${productImage})`,
      }}
    >
      <FeedLikeIcon postId={item?.id} isWishlisted={item?.is_wishlisted} type="brand" token={token} vipId={vipId} />
      {brandLogo && (
        <Box className="brand-logo">
          <Image src={brandLogo} alt="brand logo" fill sizes="(max-width: 1000px) 100vw, 1000px" />
        </Box>
      )}
    </Card>
  );
};

export default DetailPageImageContainer;
