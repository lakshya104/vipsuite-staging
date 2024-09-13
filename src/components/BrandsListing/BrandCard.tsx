import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import FeedLikeIcon from '../FeedLikeIcon';
import { Brand } from '@/interfaces/brand';
import { ProgressBarLink } from '../ProgressBar';
import Image from 'next/image';
import { truncateDescription } from '@/helpers/utils';

interface BrandCardProps {
  item: Brand;
}

const BrandCard: React.FC<BrandCardProps> = ({ item }) => {
  const productImage = item?.acf?.brand_image?.url || '/img/placeholder-image.jpg';
  const brandLogo = item.acf?.brand_logo?.url;
  return (
    <ProgressBarLink href={`/brands/${item.id}`}>
      <Card
        className="landing-product__item-inner"
        sx={{
          backgroundImage: `url(${productImage})`,
        }}
      >
        <FeedLikeIcon isWishlisted={item?.is_wishlisted} postId={item?.id} />
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
          <Typography variant="body2">
            {item['brand-category']?.map((category, index) => (
              <span key={index}>
                {category}
                {index < item['brand-category'].length - 1 && <span> | </span>}
              </span>
            ))}
          </Typography>
        </CardContent>
      </Card>
    </ProgressBarLink>
  );
};

export default BrandCard;
