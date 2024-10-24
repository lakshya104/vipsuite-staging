import { BrandDetails } from '@/interfaces/brand';
import { Box, Card } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import { DefaultImageFallback } from '@/helpers/enums';

interface DetailPageImageContainerProps {
  item: BrandDetails;
}

const DetailPageImageContainer: React.FC<DetailPageImageContainerProps> = ({ item }) => {
  const productImage = item?.acf?.brand_image?.sizes?.large || DefaultImageFallback.placeholder;
  const brandLogo = item?.acf?.brand_logo?.url;
  return (
    <Card
      className="product-detail__item"
      sx={{
        backgroundImage: `url(${productImage})`,
      }}
    >
      {brandLogo && (
        <Box className="brand-logo">
          <Image src={brandLogo} alt="brand logo" fill sizes="(max-width: 1000px) 100vw, 1000px" />
        </Box>
      )}
    </Card>
  );
};

export default DetailPageImageContainer;
