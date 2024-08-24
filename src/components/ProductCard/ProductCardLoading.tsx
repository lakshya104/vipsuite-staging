import React from 'react';
import { Box, Card, CardContent, Skeleton } from '@mui/material';
import './ProductCardLoading.scss';

const ProductCardLoading = () => {
  return (
    <Box className="product-list__page" mt={4}>
      <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={2}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <Skeleton variant="rectangular" width="100%" height={250} />
            <CardContent>
              <Skeleton variant="text" width="60%" height={30} />
              <Skeleton variant="text" width="100%" height={20} />
              <Skeleton variant="text" width="100%" height={20} />
            </CardContent>
            <Box mt={2} p={2}>
              <Skeleton variant="rectangular" width="100%" height={40} />
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ProductCardLoading;
