import React from 'react';
import Image from 'next/image';
import { Box, Container, Typography } from '@mui/material';
import he from 'he';
import ModuleSlides from './ModuleSlides';
import { PageData } from '@/interfaces/public-page';
import { DefaultImageFallback } from '@/helpers/enums';

interface LandingSlugContainerProps {
  data: PageData | undefined;
  isDefaultHeroPanel: boolean;
}

const LandingSlugContainer: React.FC<LandingSlugContainerProps> = ({ isDefaultHeroPanel, data }) => {
  return (
    <Box component="main" className="site-main" minHeight="50vh">
      <Container>
        {isDefaultHeroPanel ? (
          <>
            <Typography className="page-title" variant="h1" align="center">
              {data?.acf?.heading}
            </Typography>
            <Box className="image-module">
              <Box>
                <Image
                  src={data?.acf?.image?.sizes?.['vs-container'] || DefaultImageFallback.LandscapePlaceholder}
                  alt="Two smiling women"
                  width={1276}
                  height={682}
                  placeholder="blur"
                  blurDataURL={DefaultImageFallback.LandscapePlaceholder}
                />
              </Box>
            </Box>
          </>
        ) : (
          <Typography className="page-title" variant="h1" align="center">
            {he.decode(data?.acf?.heading || data?.title?.rendered || '')}
          </Typography>
        )}
      </Container>
      {data?.acf?.content_modules.map((module, index) => {
        return <ModuleSlides key={index} module={module} />;
      })}
    </Box>
  );
};

export default LandingSlugContainer;
