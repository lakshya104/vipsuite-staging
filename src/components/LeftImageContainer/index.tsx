import React from 'react';
import { Grid2, Box, Typography, Button, Container } from '@mui/material';
import Image from 'next/image';
import { ContentBlocks } from '@/interfaces/public-page';
import { DefaultImageFallback } from '@/helpers/enums';
import { getLastPathSegment } from '@/helpers/utils';
import Link from 'next/link';
import ShowHtml from '../ShowHtml';

interface LeftImageContainerProps {
  data: ContentBlocks;
}

const LeftImageContainer: React.FC<LeftImageContainerProps> = ({ data }) => {
  const href =
    data?.cta?.cta_type === 'page' ? data?.cta?.cta_page?.slug : getLastPathSegment(data?.cta?.cta_url || '') || '/';

  return (
    <Container className="about-us__section">
      <Grid2 container spacing={4} alignItems="center">
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Box className="about-us__image-wrapper">
            <Image
              src={data?.image?.url || DefaultImageFallback.Placeholder}
              alt={data?.image?.name || 'About Us'}
              width={520}
              height={520}
              style={{ borderRadius: '8px', objectFit: 'cover' }}
            />
          </Box>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }} className="about-us__content">
          <Typography variant="h3" gutterBottom>
            {data?.heading}
          </Typography>
          <ShowHtml text={data?.description || ''} />
          {data.show_cta &&
            (data?.cta?.cta_external_link ? (
              <a href={data?.cta?.cta_url} target="_blank" rel="noopener noreferrer">
                <Button variant="contained" className="button button--white">
                  {data?.cta?.cta_text}
                </Button>
              </a>
            ) : (
              <Link href={href} passHref>
                <Button variant="contained" className="button button--white">
                  {data?.cta?.cta_text}
                </Button>
              </Link>
            ))}
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default LeftImageContainer;
