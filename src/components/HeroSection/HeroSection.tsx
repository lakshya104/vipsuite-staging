import React from 'react';
import Link from 'next/link';
import { Box, Typography, Container } from '@mui/material';
import './HeroSection.scss';
import { ContentModule } from '@/interfaces/public-page';
import { getRelativePath } from '@/helpers/utils';

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
        {data.cta_group?.map((ctaItem, index) => {
          const relativeUrl = getRelativePath(ctaItem.cta_url);
          return (
            <Link key={index} href={relativeUrl} legacyBehavior>
              <a className="button button--black">{ctaItem.cta_text}</a>
            </Link>
          );
        })}
      </Container>
    </Box>
  );
};

export default HeroSection;
