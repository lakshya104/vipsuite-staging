import React from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import Image from 'next/image';
import Partner from '@/components/Partner/Partner';
import JoinUs from '@/components/JoinUs';
import Header from '@/components/Header/Header';
import '../landingPages.scss';

const VIPLandingPage = () => {
  return (
    <>
      <Header />
      <Box component="main" className="site-main">
        <Container>
          <Typography className="page-title" variant="h1" align="center">
            For VIPs
          </Typography>
          <Box className="image-module">
            <Box>
              <Image src="/img/card.jpg" alt="Two smiling women" width={1276} height={682} />
            </Box>
          </Box>
          <Box className="content-module">
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" component="h2" gutterBottom>
                  Elevate yourself with a platform designed for those who expect the best, find events, products,
                  experiences, and commercial opportunities all in one convenient place.
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="body1" paragraph>
                  The VIP Suite offers far more than just gifting its your gateway to exclusive opportunities and
                  meaningful connections not to mention one of the worlds most exclusive online communities. Apply for a
                  complimentary membership today and discover the brands that resonate with you, while building
                  authentic relationships in the process.
                </Typography>

                <Typography variant="body1" paragraph>
                  Once approved, your profile will elevate your visibility, increasing your chances of being selected
                  for event invitations as well as gifting. Well also then ensure your representatives are notified of
                  collaboration and other commercial opportunities that align with your profile. To maximize your
                  potential, be sure to provide detailed information when applying, so we can match you with the most
                  suitable opportunities available.
                </Typography>

                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    borderRadius: '50px',
                    px: { xs: 4, sm: 7 },
                    py: { xs: 1, sm: 2 },
                    border: '2px solid black',
                    mb: { xs: 2, sm: 0 },
                    '&:hover': {
                      backgroundColor: 'black',
                    },
                  }}
                >
                  Join The VIP Suite
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>

        <JoinUs />
        <Partner />
      </Box>
    </>
  );
};

export default VIPLandingPage;
