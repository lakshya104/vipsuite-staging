'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, CardContent, Typography } from '@mui/material';
import Btn from '@/components/Button/CommonBtn';
import { ProductDetail } from '@/interfaces/product';

interface ProductProps {
  data: ProductDetail;
}

const ProductCard: React.FC<ProductProps> = ({ data }) => {
  const { id, name, description, imageUrl, requestOnly } = data;
  const router = useRouter();

  const handleViewItemClick = (id: number) => {
    router.push(`/products/${id}`);
  };

  return (
    <Card className="product-card">
      <Image src={imageUrl} alt={name} height={768} width={768} />
      <CardContent className="product-card__content">
        {requestOnly && (
          <Typography variant="overline" display="block" gutterBottom>
            Request Only
          </Typography>
        )}
        <Typography gutterBottom variant="h5" component="h3">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <Btn look="dark-filled" width="100%" onClick={() => handleViewItemClick(id)}>
        View Item
      </Btn>
    </Card>
  );
};

export default ProductCard;
