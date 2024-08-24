import React from 'react';
import { Box, Card, Container, Typography, Skeleton, CardContent } from '@mui/material';
import '../Brand.scss';

const BrandPageSkeleton = () => {
  return (
    <Box component={'main'} className="product-detail">
      <Container>
        <Typography className="page-title" variant="h2" component="h1" align="center">
          <Box display="flex" justifyContent="center">
            <Skeleton width="25%" height={50} />
          </Box>
        </Typography>

        <Card className="product-detail__item">
          <Skeleton variant="rectangular" width="100%" height={400} />
        </Card>
        <Box mt={2}>
          <Skeleton variant="text" width="100%" height={40} />
          <Skeleton variant="text" width="90%" height={40} />
          <Skeleton variant="text" width="80%" height={40} />
        </Box>
        <Box className="gray-card" display={'flex'} justifyContent={'space-between'} gap={2.5} mt={2}>
          <Card sx={{ width: '100%' }}>
            <Skeleton variant="rectangular" width="100%" height={120} />
          </Card>
        </Box>
        <Box mt={2}>
          <Skeleton variant="rectangular" width="100%" height={50} />
        </Box>
        <Box className="product-list__page" mt={4}>
          <Typography variant="h2" gutterBottom>
            <Skeleton width="30%" />
          </Typography>
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
      </Container>
    </Box>
  );
};

export default BrandPageSkeleton;
