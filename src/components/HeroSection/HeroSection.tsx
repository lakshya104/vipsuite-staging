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
          <Link href={'/on-boarding'}>Apply Today</Link>
        </Container>
      </Box>
    </>
  );
};

export default HeroSection;
