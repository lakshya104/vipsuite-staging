import React from 'react';
import Link from 'next/link';
import { Box, Typography, Container } from '@mui/material';
import './HeroSection.scss';
import { ContentModule } from '@/interfaces/public-page';

interface HeroSectionProps {
  data: ContentModule;
}

const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  return (
    <Box component="section" className="site-hero">
      <Container>
        <Typography component="h1" variant="h1">
          {data?.heading}
        </Typography>
        {data?.cta_group?.map((ctaItem, index) => (
          <Link
            legacyBehavior
            key={index}
            href={ctaItem?.cta?.url}
            target={ctaItem?.cta?.target || '_self'}
            rel={ctaItem?.cta?.target === '_blank' ? 'noopener noreferrer' : undefined}
          >
            <a className="button button--black">{ctaItem?.cta?.title}</a>
          </Link>
        ))}
      </Container>
    </Box>
  );
};

export default HeroSection;
