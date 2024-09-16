import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import './HeroSection.scss';
import { ProgressBarLink } from '../ProgressBar';
import { PageData } from '@/interfaces/public-page';

interface HeroSectionProps {
  data: PageData;
}

const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  const contentModule = data?.acf?.content_modules?.[0];

  return (
    <Box component="section" className="site-hero">
      <Container>
        <Typography component="h1" variant="h1">
          {contentModule?.heading}
        </Typography>
        {contentModule?.cta_group?.[0]?.cta_text ? (
          <ProgressBarLink href="/for-brands" className="button button--black">
            {contentModule?.cta_group?.[0]?.cta_text}
          </ProgressBarLink>
        ) : (
          <ProgressBarLink href="/for-brands" className="button button--black">
            For Brands
          </ProgressBarLink>
        )}

        {contentModule?.cta_group?.[1]?.cta_text ? (
          <ProgressBarLink href="/for-vips" className="button button--black">
            {contentModule?.cta_group?.[1]?.cta_text}
          </ProgressBarLink>
        ) : (
          <ProgressBarLink href="/for-vips" className="button button--black">
            For VIPs
          </ProgressBarLink>
        )}
      </Container>
    </Box>
  );
};

export default HeroSection;
