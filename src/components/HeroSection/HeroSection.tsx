import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import './HeroSection.scss';
import { PageData } from '@/interfaces/public-page';

interface HeroSectionProps {
  data: PageData;
}

const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  const contentModule = data?.acf?.content_modules?.[0];
  const ctaGroup = contentModule?.cta_group;

  return (
    <Box component="section" className="site-hero">
      <Container>
        <Typography component="h1" variant="h1">
          {contentModule?.heading}
        </Typography>

        {ctaGroup?.map((ctaItem, index) => (
          <a
            key={index}
            href={ctaItem.cta.url}
            target={ctaItem.cta.target || '_self'}
            className="button button--black"
            rel={ctaItem.cta.target === '_blank' ? 'noopener noreferrer' : undefined}
          >
            {ctaItem.cta.title}
          </a>
        ))}
      </Container>
    </Box>
  );
};

export default HeroSection;
