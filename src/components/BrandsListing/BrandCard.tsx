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
  const handleIconClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
  };
  return (
    <ProgressBarLink href={`/brands/${item.id}`}>
      <Card
        className="landing-product__item-inner"
        sx={{
          backgroundImage: `url(${productImage})`,
        }}
      >
        <FeedLikeIcon onClick={handleIconClick} />
        {brandLogo && (
          <Box className="brand-logo">
            <Image src={brandLogo} alt="brand logo" layout="fill" />
          </Box>
        )}{' '}
        <CardContent className="landing-product__item-content">
          <Typography variant="h2">{item?.title?.rendered}</Typography>
          {item?.acf?.short_description && (
            <Typography variant="body2" mb={2}>
              {truncateDescription(item?.acf?.short_description, 30)}
            </Typography>
          )}
          <Typography variant="body2">{item['brand-category'].join(' | ')}</Typography>
        </CardContent>
      </Card>
    </ProgressBarLink>
  );
};

export default BrandCard;
