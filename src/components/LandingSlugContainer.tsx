import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { ProgressBarLink } from './ProgressBar';
import ModuleSlides from './ModuleSlides';
import { PageData } from '@/interfaces/public-page';

interface LandingSlugContainerProps {
  data: PageData | undefined;
  isDefaultHeroPanel: boolean;
}
const LandingSlugContainer: React.FC<LandingSlugContainerProps> = ({ isDefaultHeroPanel, data }) => {
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
      </Container>
      {data?.acf?.content_modules.map((module, index) => {
        return <ModuleSlides key={index} module={module} />;
      })}
    </Box>
  );
};

export default LandingSlugContainer;
