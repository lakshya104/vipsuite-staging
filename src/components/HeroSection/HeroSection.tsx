import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { heroSectionLine } from '@/data';
import './HeroSection.scss';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <>
      <Box component="section" className="site-hero">
        <Container>
          <Typography component="h1" variant="h1">
            {heroSectionLine}
          </Typography>
          <Link href={'/home-brands'} className="button button--black">
            For Brands
          </Link>
          <Link href={'/vip'} className="button button--black">
            For VIPs
          </Link>
        </Container>
      </Box>
    </>
  );
};

export default HeroSection;
