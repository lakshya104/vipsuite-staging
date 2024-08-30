import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import FeedLikeIcon from '../FeedLikeIcon';
import { Brand } from '@/interfaces/brand';
import { ProgressBarLink } from '../ProgressBar';
import Image from 'next/image';

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
        {brandLogo && <Image src={brandLogo} width={50} height={50} alt="brand logo" />}{' '}
        <CardContent className="landing-product__item-content">
          <Typography variant="h2">{item?.title?.rendered}</Typography>
          {item?.acf && (
            <Typography variant="body2" mb={2}>
              {item?.acf?.short_description}
            </Typography>
          )}
          <Typography variant="body2">{item['brand-category'].join(' | ')}</Typography>
        </CardContent>
      </Card>
    </ProgressBarLink>
  );
};

export default BrandCard;
