import React from 'react';
import Image from 'next/image';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { first, get } from 'lodash';
import ErrorHandler from '@/components/ErrorHandler';
import { PageData } from '@/interfaces/public-page';
import { GetPageContent } from '@/libs/api-manager/manager';
import ModuleSlides from '@/components/ModuleSlides';
import { ProgressBarLink } from '@/components/ProgressBar';

interface LandingSlugPageProps {
  slug: string;
}

const LandingSlugPage: React.FC<LandingSlugPageProps> = async ({ slug }) => {
  try {
    const pageData: PageData[] = await GetPageContent(slug);
    const data = first(pageData);
    const isDefaultHeroPanel = get(data, 'acf.use_default_hero_panel', false) === true;

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
                      {data?.acf?.subheading}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1" paragraph>
                      {data?.acf?.copy}
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
    return <ErrorHandler error={error} errMessage="Error fetching page content" />;
  }
};

export default LandingSlugPage;
