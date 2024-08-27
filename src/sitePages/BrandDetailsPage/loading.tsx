import React from 'react';
import { Box, Container, Typography, Skeleton } from '@mui/material';
import ProductCardLoading from '@/components/ProductCard/ProductCardLoading';

const BrandDetailsPageLoading = () => {
  return (
      <Container>
        <Typography className="page-title" variant="h2" component="h1" align="center">
          <Box display="flex" justifyContent="center">
            <Skeleton width="25%" height={50} />
          </Box>
        </Typography>
        <Box className="product-detail__item">
          <Skeleton variant="rectangular" width="100%" height="100%" />
        </Box>
        <Box mt={2}>
          <Skeleton variant="text" width="100%" height={40} />
          <Skeleton variant="text" width="90%" height={40} />
          <Skeleton variant="text" width="80%" height={40} />
        </Box>
        <Box className="gray-card" display={'flex'} justifyContent={'space-between'} gap={2.5} mt={2}>
          <Box sx={{ width: '100%' }}>
            <Skeleton variant="rectangular" width="100%" height={120} />
          </Box>
        </Box>
        <Box mt={2}>
          <Skeleton variant="rectangular" width="100%" height={50} />
        </Box>
        <Box className="product-list__page" mt={4}>
          <Typography variant="h2" gutterBottom>
            <Skeleton width="30%" />
          </Typography>
          <ProductCardLoading />
        </Box>
      </Container>
  );
};

export default BrandDetailsPageLoading;
