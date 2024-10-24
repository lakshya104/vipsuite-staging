import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
// import FeedLikeIcon from '../FeedLikeIcon';
import { Brand } from '@/interfaces/brand';
import { ProgressBarLink } from '../ProgressBar';
import Image from 'next/image';
import { truncateDescription } from '@/helpers/utils';
import { DefaultImageFallback } from '@/helpers/enums';

interface BrandCardProps {
  item: Brand;
}

const BrandCard: React.FC<BrandCardProps> = ({ item }) => {
  const productImage = item?.acf?.brand_image?.url || DefaultImageFallback.Placeholder;
  const brandLogo = item.acf?.brand_logo?.url;
  return (
    <ProgressBarLink href={`/brands/${item.id}`}>
      <Card
        className="landing-product__item-inner"
        sx={{
          backgroundImage: `url(${productImage})`,
        }}
      >
        {/* <FeedLikeIcon isWishlisted={item?.is_wishlisted} postId={item?.id} type="brand" /> */}
        {brandLogo && (
          <Box className="brand-logo">
            <Image src={brandLogo} alt="brand logo" fill sizes="(max-width: 199px) 100vw, 199px" />
          </Box>
        )}{' '}
        <CardContent className="landing-product__item-content">
          <Typography variant="h2">{item?.title?.rendered}</Typography>
          {item?.acf?.short_description && (
            <Typography variant="body2" mb={2}>
              {truncateDescription(item?.acf?.short_description, 30)}
            </Typography>
          )}
        </CardContent>
      </Card>
    </ProgressBarLink>
  );
};

export default BrandCard;
