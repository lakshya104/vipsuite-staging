import { Box, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import './Brand.scss';
import { GetBrands } from '@/libs/api-manager/manager';
import FeedLikeIcon from '@/components/FeedLikeIcon';
import Link from 'next/link';

interface Brand {
  id: number;
  title: {
    rendered: string;
  };
  acf?: {
    short_description?: string;
  };
  'brand-category': string[];
  byRequest?: boolean;
}

export default async function Page() {
  const brands: Brand[] = await GetBrands();
  return (
    <Box component={'main'} className="landing-page">
      <Container>
        <Box className="gray-card" display={'flex'} justifyContent={'space-between'} gap={2.5}></Box>
        <Grid className="landing-product" container spacing={2.5}>
          {brands.map((item) => (
            <Grid item xs={12} sm={6} lg={4} key={item.id} className="landing-product__item">
              <BrandCard item={item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

interface BrandCardProps {
  item: Brand;
}

const BrandCard: React.FC<BrandCardProps> = ({ item }) => {
  return (
    <Card
      className="landing-product__item-inner"
      sx={{
        backgroundImage: `url(/img/bodaSkins.png)`,
      }}
    >
      <FeedLikeIcon />
      {/* {item.byRequest && <Chip label="BY REQUEST ONLY" />} */}
      <Link href={`/brands/${item.id}`}>
        {' '}
        <CardContent className="landing-product__item-content">
          <Typography variant="h2">{item?.title?.rendered}</Typography>
          {item.acf && (
            <Typography variant="body2" mb={2}>
              {item.acf.short_description}
            </Typography>
          )}
          <Typography variant="body2">{item['brand-category'].join(' | ')}</Typography>
        </CardContent>
      </Link>
    </Card>
  );
};
