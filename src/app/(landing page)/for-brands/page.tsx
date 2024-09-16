import React from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import Image from 'next/image';
import BrandsPlace from '@/components/BrandsPlace';
import BrandClub from '@/components/BrandClub';
import JoinUs from '@/components/JoinUs';
import '../landingPages.scss';
import TestimonialSection from '@/components/TestimonialSection';
import { ProgressBarLink } from '@/components/ProgressBar';
import { GetPageContent } from '@/libs/api-manager/manager';
export default async function Page() {
  const pageData = await GetPageContent(906);
  return (
    <Box component="main" className="site-main">
      <Container>
        <Typography className="page-title" variant="h1" align="center">
          {pageData.acf.heading}
        </Typography>
        <Box className="image-module">
          <Box>
            <Image
              src={pageData.acf.image.sizes['vs-container-2x']}
              alt="Two smiling women"
              width={1276}
              height={682}
            />
          </Box>
        </Box>
        <Box className="content-module">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h2" gutterBottom>
                {pageData.acf.subhading}
              </Typography>
            </Grid>

            <Grid item xs={12} md={5}>
              <Typography variant="body1" paragraph>
                {pageData.acf.copy}
              </Typography>

              <Typography variant="body1" paragraph>
                {pageData.acf.copy}
              </Typography>
              <ProgressBarLink href={'/on-boarding'}>
                <Button variant="contained" type="submit" className="button button--black">
                  {pageData.acf.cta.cta_text}
                </Button>
              </ProgressBarLink>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <JoinUs data={pageData} />
      <BrandsPlace data={pageData} />
      <BrandClub data={pageData} />
      <TestimonialSection data={pageData} />
    </Box>
  );
}
