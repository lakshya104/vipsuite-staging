import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { heroSectionLine } from '@/data';
import './HeroSection.scss';
import { ProgressBarLink } from '../ProgressBar';

const HeroSection = () => {
  return (
    <>
      <Box component="section" className="site-hero">
        <Container>
          <Typography component="h1" variant="h1">
            {heroSectionLine}
          </Typography>
          <ProgressBarLink href={'/for-brands'} className="button button--black">
            For Brands
          </ProgressBarLink>
          <ProgressBarLink href={'/for-vips'} className="button button--black">
            For VIPs
          </ProgressBarLink>
        </Container>
      </Box>
    </>
  );
};

export default HeroSection;
