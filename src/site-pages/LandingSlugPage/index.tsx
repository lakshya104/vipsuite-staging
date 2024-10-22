import React from 'react';
import Image from 'next/image';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { first, get, isEmpty } from 'lodash';
import ErrorHandler from '@/components/ErrorHandler';
import { PageData } from '@/interfaces/public-page';
import { GetPageContent } from '@/libs/api-manager/manager';
import ModuleSlides from '@/components/ModuleSlides';
import { ProgressBarLink } from '@/components/ProgressBar';
import LandingPage from '../LandingPage';
import './LandingSlugPage.scss';

interface LandingSlugPageProps {
  slug: string;
}

const LandingSlugPage: React.FC<LandingSlugPageProps> = async ({ slug }) => {
  try {
    const pageData: PageData[] = await GetPageContent(slug);
    const data = first(pageData);
    const isDefaultHeroPanel = get(data, 'acf.use_default_hero_panel', false) === true;

    if (isEmpty(pageData)) {
      return <LandingPage />;
    }
    return (
      <Box component="main" className="site-main">
        <Container>
          {isDefaultHeroPanel && (
            <>
              <Typography className="page-title" variant="h1" align="center">
                {data?.acf?.heading}
              </Typography>
              <Box className="image-module">
                <Box>
                  <Image
                    src={data?.acf?.image?.sizes['vs-container-2x'] || '/default-image.jpg'}
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
                      {data?.acf?.subhading}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1" paragraph>
                      {data?.acf?.copy}
                    </Typography>
                    <ProgressBarLink href={'/on-boarding'}>
                      <Button variant="contained" type="submit" className="joinbtn">
                        {data?.acf?.cta?.cta_text}
                      </Button>
                    </ProgressBarLink>
                  </Grid>
                </Grid>
              </Box>
            </>
          )}
          {data?.acf?.content_modules.map((module, index) => {
            return <ModuleSlides key={index} module={module} />;
          })}
        </Container>
      </Box>
    );
  } catch (error) {
    console.log({ error });

    return <ErrorHandler error={error} errMessage="Error fetching page content" />;
  }
};

export default LandingSlugPage;
