import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import BasketCard from '@/components/BasketCard';

const Basket = () => {
  return (
    <Box className="basket-page">
      <Container>
        <Typography className="page-title" variant="h2" align="center" component="h1">
          Basket
        </Typography>
        <BasketCard />
      </Container>
    </Box>
  );
};

export default Basket;
