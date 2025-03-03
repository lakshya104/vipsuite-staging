'use client';
import React from 'react';
import Image from 'next/image';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { BrandProduct } from '@/interfaces/brand';
import Btn from '../Button/CommonBtn';
import { truncateDescription } from '@/helpers/utils';
import { ProgressBarLink } from '../ProgressBar';
import { DefaultImageFallback } from '@/helpers/enums';
import en from '@/helpers/lang';
import { paths } from '@/helpers/paths';

interface ProductCardProps {
  data: BrandProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const { id, name, short_description, meta_data, images } = data;
  const isRequestOnlyValue = meta_data.find((item) => item.key === 'is_request_only')?.value ?? false;
  const productImage = images?.[0]?.src || DefaultImageFallback.Placeholder;
  const productDesctiption = truncateDescription(short_description, 18);
  return (
    <Card className="product-card" sx={{ cursor: 'pointer' }}>
      <ProgressBarLink href={paths.root.productDetails.getHref(id, id)}>
        <Image src={productImage} alt={name} height={768} width={768} />
        <Box>
          <CardContent className="product-card__content">
            {isRequestOnlyValue === '1' && (
              <Typography variant="overline" display="block" gutterBottom>
                {en.products.requestOnly}
              </Typography>
            )}
            <Typography gutterBottom variant="h5" component="h3">
              {name}
            </Typography>
            <Box dangerouslySetInnerHTML={{ __html: productDesctiption }} />
          </CardContent>
          <Btn look="dark-filled" width="100%">
            {en.products.viewItem}
          </Btn>
        </Box>
      </ProgressBarLink>
    </Card>
  );
};

export default ProductCard;
