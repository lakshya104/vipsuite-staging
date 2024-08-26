import React from 'react';
import Image from 'next/image';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { BrandProduct } from '@/interfaces/brand';
import Btn from '../Button/CommonBtn';
import { truncateDescription } from '@/helpers/utils';
import { ProgressBarLink } from '../ProgressBar';

const ProductCard = ({ data }: { data: BrandProduct }) => {
  const { id, name, short_description, meta_data, images } = data;
  const isRequestOnlyValue = meta_data.find((item) => item.key === 'is_request_only')?.value ?? false;
  const productImage =
    images.find((item) => item.name === 'placeholder-image-large')?.src ??
    'https://archive.org/download/placeholder-image/placeholder-image.jpg';
  const productDesctiption = truncateDescription(short_description, 18);
  return (
    <Card className="product-card">
      <Image src={productImage} alt={name} height={768} width={768} />
      <CardContent className="product-card__content">
        {isRequestOnlyValue === '1' && (
          <Typography variant="overline" display="block" gutterBottom>
            Request Only
          </Typography>
        )}
        <Typography gutterBottom variant="h5" component="h3">
          {name}
        </Typography>
        <Box dangerouslySetInnerHTML={{ __html: productDesctiption }} />
      </CardContent>
      <ProgressBarLink href={`/products/${id}`}>
        <Btn look="dark-filled" width="100%">
          View Item
        </Btn>
      </ProgressBarLink>
    </Card>
  );
};

export default ProductCard;
