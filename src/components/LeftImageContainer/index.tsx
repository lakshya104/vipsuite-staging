'use client';
import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, Button, Container } from '@mui/material';
import Image from 'next/image';
import { ContentBlocks } from '@/interfaces/public-page';
import { DefaultImageFallback } from '@/helpers/enums';
import { getLastPathSegment, wrapInParagraph } from '@/helpers/utils';
import Link from 'next/link';

interface LeftImageContainerProps {
  data: ContentBlocks;
}

const LeftImageContainer: React.FC<LeftImageContainerProps> = ({ data }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const content = wrapInParagraph(data?.description || '');
  return (
    <Container className="about-us__section">
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Box className="about-us__image-wrapper">
            <Image
              src={data?.image?.url || DefaultImageFallback.Placeholder}
              alt={data?.image?.name || 'About Us'}
              width={520}
              height={520}
              style={{ borderRadius: '8px', objectFit: 'cover' }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6} className="about-us__content">
          <Typography variant="h3" gutterBottom>
            {data?.heading}
          </Typography>
          {isClient && <Typography variant="body1" dangerouslySetInnerHTML={{ __html: content || '' }} />}
          {data.show_cta && (
            <Link href={getLastPathSegment(data?.cta?.cta_url || '') || '/'} passHref>
              <Button variant="contained" className="button button--white">
                {data?.cta?.cta_text}
              </Button>
            </Link>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default LeftImageContainer;
