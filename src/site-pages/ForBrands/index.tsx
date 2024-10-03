import BrandClub from '@/components/BrandClub';
import BrandsPlace from '@/components/BrandsPlace';
import ErrorHandler from '@/components/ErrorHandler';
import JoinUs from '@/components/JoinUs';
import { ProgressBarLink } from '@/components/ProgressBar';
import TestimonialSection from '@/components/TestimonialSection';
import { PageData } from '@/interfaces/public-page';
import { GetPageContent } from '@/libs/api-manager/manager';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const BrandsPage = async () => {
  try {
    const pageData: PageData = await GetPageContent(906);
    return (
      <Box component="main" className="site-main">
        <Container>
          <Typography className="page-title" variant="h1" align="center">
            {pageData?.acf?.heading}
          </Typography>
          <Box className="image-module">
            <Box>
              <Image
                src={pageData?.acf?.image?.sizes['vs-container-2x']}
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
                  {pageData?.acf?.subhading}
                </Typography>
              </Grid>
              <Grid item xs={12} md={5}>
                <Typography variant="body1" paragraph>
                  {pageData?.acf?.copy}
                </Typography>
                <ProgressBarLink href={'/on-boarding'}>
                  <Button variant="contained" type="submit" className="button button--black">
                    {pageData?.acf?.cta?.cta_text}
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
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Error fetching page content" />;
  }
};

export default BrandsPage;
