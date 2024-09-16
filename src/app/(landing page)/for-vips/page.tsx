import React from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import Image from 'next/image';
import Partner from '@/components/Partner/Partner';
import JoinUs from '@/components/JoinUs';
import '../landingPages.scss';
import { ProgressBarLink } from '@/components/ProgressBar';
import { GetPageContent } from '@/libs/api-manager/manager';

export default async function Page() {
  const pageData = await GetPageContent(903);
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
              <Typography variant="h4" component="h2" gutterBottom>
                {pageData.acf.subhading}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body1" paragraph>
                {pageData.acf.copy}
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
                  {pageData.acf.cta.cta_text}
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
}
