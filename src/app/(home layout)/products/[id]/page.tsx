import React from 'react';
import Image from 'next/image';
import { Box, Container, Grid, Typography } from '@mui/material';
import ItemRequestForm from '@/features/ItemRequestForm';
import './ProductDetails.scss';
import { products } from '@/data';

const sizes = [
  { value: 's', label: 'S' },
  { value: 'm', label: 'M' },
  { value: 'l', label: 'L' },
  { value: 'xl', label: 'XL' },
];

interface Params {
  id: string;
}

interface PageProps {
  params: Params;
}

export default function Page({ params }: PageProps) {
  const productId = parseInt(params.id, 10);

  const productToAdd = products.find((product) => product.id === productId);

  if (!productToAdd) {
    return (
      <Box className="product-details__page">
        <Container>
          <Typography variant="h2" component="h1" gutterBottom>
            Product Not Found
          </Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box className="product-details__page">
      <Container>
        <Typography variant="h2" component="h1" gutterBottom>
          {productToAdd.name}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Image src={productToAdd.imageUrl} alt={productToAdd.name} height={500} width={500} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" gutterBottom>
              {productToAdd.category}
            </Typography>
            <Typography variant="h2" component="h2" gutterBottom>
              {productToAdd.name}
            </Typography>
            <Typography variant="body2">{productToAdd.description}</Typography>
            <ItemRequestForm options={sizes} data={productToAdd} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
