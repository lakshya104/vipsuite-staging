import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import Link from 'next/link';
import Btn from '../Button/CommonBtn';
import { heroSectionLine } from '@/data';
import './HeroSection.scss';

const HeroSection = () => {
  return (
    <Box component="section" className="site-hero">
      <Container>
        <Typography component="h1" variant="h1">
          {heroSectionLine}
        </Typography>
        <Btn look="dark-filled" component={Link} href="#">
          Apply Today
        </Btn>
      </Container>
    </Box>
  );
};

export default HeroSection;
