'use client';
import React, { useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import Btn from '../Button/CommonBtn';
import { heroSectionLine } from '@/data';
import './HeroSection.scss';
import VIPSuiteDialog from '../VIPSuiteDialog';

const HeroSection = () => {
  const [isDialogopen, setIsDialogOpen] = useState(false);
  const DialogBtns = [
    { href: '/signup/vip', text: 'Apply as VIP' },
    { href: '/signup/agent', text: 'Apply as Agent' },
    { href: '/signup/brand', text: 'Apply as Brand' },
  ];
  return (
    <>
      <Box component="section" className="site-hero">
        <Container>
          <Typography component="h1" variant="h1">
            {heroSectionLine}
          </Typography>
          <Btn look="dark-filled" onClick={() => setIsDialogOpen(true)}>
            Apply Today
          </Btn>
        </Container>
      </Box>
      <VIPSuiteDialog
        isOpen={isDialogopen}
        onClose={() => setIsDialogOpen(false)}
        withLogo={false}
        buttonsArray={DialogBtns}
      />
    </>
  );
};

export default HeroSection;
