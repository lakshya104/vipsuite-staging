import React from 'react';
import JoinUs from '@/components/JoinUs';
import Partner from '@/components/Partner/Partner';
import { ProgressBarLink } from '@/components/ProgressBar';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { GetPageContent } from '@/libs/api-manager/manager';
import { PageData } from '@/interfaces/public-page';
import Image from 'next/image';
import ErrorHandler from '@/components/ErrorHandler';

const VipPage = async () => {
  try {
    const pageData: PageData = await GetPageContent(903);
    return (
      <Box component="main" className="site-main">
        <Container>
          <Typography className="page-title" variant="h1" align="center">
            {pageData?.acf?.heading}
          </Typography>
          <Box className="image-module">
            <Box>
              <Image
                src={pageData?.acf?.image?.sizes['vs-container-2x'] || '/default-image.jpg'}
                alt="Two smiling women"
                width={1276}
                height={682}
              />
            </Box>
          </Box>
          <Box className="content-module">
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" component="h2" gutterBottom>
                  {pageData?.acf?.subheading}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" paragraph>
                  {pageData?.acf?.copy}
                </Typography>
                <ProgressBarLink href={'/on-boarding'}>
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
                    {pageData?.acf?.cta?.cta_text}
                  </Button>
                </ProgressBarLink>
              </Grid>
            </Grid>
          </Box>
        </Container>
        <JoinUs data={pageData} />
        <Partner data={pageData} />
      </Box>
    );
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Error fetching page content" />;
  }
};

export default VipPage;
