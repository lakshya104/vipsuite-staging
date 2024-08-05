import * as React from 'react';
import { Typography, Grid, Box, Container } from '@mui/material';
import { partners } from '@/data';
import Image from 'next/image';
import './Partner.scss';

const Partner = () => {
  return (
    <Box component="section" className="site-partner">
      <Container>
        <Typography component="h2" variant="h2">
          Proudly Partnered with...
        </Typography>
        <Grid container justifyContent={'center'} spacing={3}>
          {partners.map((partner, index) => (
            <Grid item key={index} xs={6} sm={4} md={3} lg={2} className="site-partner__card">
              <Box className="site-partner__card-inner">
                <Image src="/karcher.png" alt={partner.title} width={64} height={64} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Partner;
