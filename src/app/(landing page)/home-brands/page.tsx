import React from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import Image from 'next/image';
import BrandsPlace from '@/components/BrandsPlace';
import BrandClub from '@/components/BrandClub';
import JoinUs from '@/components/JoinUs';
import Header from '@/components/Header/Header';
import '../landingPages.scss';
import TestimonialSection from '@/components/TestimonialSection';

const VIPLandingPage = () => {
  return (
    <>
      <Header />
      <Box component="main" className="site-main">
        <Container>
          <Typography className="page-title" variant="h1" align="center">
            For Brands
          </Typography>
          <Box className="image-module">
            <Box>
              <Image src="/img/card.jpg" alt="Two smiling women" width={1276} height={682} />
            </Box>
          </Box>
          <Box className="content-module">
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h3" component="h2" gutterBottom>
                  Brands and PR agencies who choose to utilise The VIP Suite do so because they want to start a real
                  story.
                </Typography>
              </Grid>

              <Grid item xs={12} md={5}>
                <Typography variant="body1" paragraph>
                  Gifting is not about sending out product cold and hoping for the best, events are not about inviting
                  people just because they are well-known and paid-for campaigns are certainly not about choosing the
                  person with the highest social following. Non-targeted approaches and one-off talent engagement like
                  this has little value and even less meaning for your brand.
                </Typography>

                <Typography variant="body1" paragraph>
                  Our secret? Engage with talent who are the right fit and feel for your brand; talent who match your
                  brand voice and understand your aspirations. Then, once you have connected, take them on your journey
                  with you.
                </Typography>

                <Button variant="contained" type="submit" className="button button--black">
                  Join The VIP Suite
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
        <JoinUs />
        <BrandsPlace />
        <BrandClub />
        <TestimonialSection />
      </Box>
    </>
  );
};

export default VIPLandingPage;
