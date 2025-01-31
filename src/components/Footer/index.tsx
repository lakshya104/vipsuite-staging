import React from 'react';
import { Box, Typography, Grid2, IconButton, Container } from '@mui/material';
import { Instagram, Twitter, Pinterest, Facebook } from '@mui/icons-material';
import './Footer.scss';
import Image from 'next/image';
import he from 'he';
import { WebsiteContent } from '@/interfaces/public-page';
import { getLastPathSegment } from '@/helpers/utils';
import Link from 'next/link';

interface FooterProps {
  footerItems: WebsiteContent;
}

const Footer: React.FC<FooterProps> = ({ footerItems }) => {
  const currentYear = new Date().getFullYear();
  return (
    <Box className="site-footer" component="footer">
      <Container>
        <Grid2 className="site-footer__nav" container spacing={3}>
          <Grid2 className="site-footer__social-icons" size={{ xs: 12, md: 3 }}>
            <Typography variant="h2">THE VIP SUITE</Typography>
            <Box>
              <IconButton
                component="a"
                href={footerItems?.instagram_url}
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram />
              </IconButton>
              <IconButton
                component="a"
                href={footerItems?.facebook_url}
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook />
              </IconButton>
              <IconButton
                component="a"
                href={footerItems?.x_url}
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter />
              </IconButton>
              <IconButton
                component="a"
                href={footerItems?.pinterest_url}
                aria-label="Pinterest"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Pinterest />
              </IconButton>
            </Box>
          </Grid2>
          <Grid2 className="site-footer__nav-links" size={{ xs: 12, sm: 4 }}>
            <Grid2 container spacing={1}>
              <Grid2 size={{ xs: 6 }}>
                <Typography variant="subtitle2">CATEGORY</Typography>
                {footerItems?.footer_menu_1.map((item, index) => (
                  <Link href={item?.url} color="inherit" key={index}>
                    {he.decode(item?.title || '')}
                  </Link>
                ))}
              </Grid2>
              <Grid2 size={{ xs: 6 }}>
                <Typography variant="subtitle2">CATEGORY</Typography>
                {footerItems?.footer_menu_2.map((item, index) => (
                  <Link href={item?.url} color="inherit" key={index}>
                    {he.decode(item?.title || '')}
                  </Link>
                ))}
              </Grid2>
            </Grid2>
          </Grid2>

          <Grid2 size={{ xs: 12, md: 5 }}>
            <Box className="site-footer__img">
              <Box>
                <a href={footerItems?.apple_store_url} target="_blank" rel="noopener noreferrer">
                  <Image
                    width={120}
                    height={40}
                    src="/img/app-store.png"
                    alt="App Store"
                    sizes="(max-width: 768px) 100px, 120px"
                    style={{ objectFit: 'contain' }}
                  />
                </a>
                <a href={footerItems?.play_store_url} target="_blank" rel="noopener noreferrer">
                  <Image
                    width={135}
                    height={40}
                    src="/img/play-store.png"
                    alt="Google Play"
                    sizes="(max-width: 768px) 100px, 120px"
                    style={{ objectFit: 'contain' }}
                  />
                </a>
              </Box>
            </Box>
          </Grid2>
        </Grid2>
      </Container>
      <Box className="site-footer__terms">
        <Container>
          <Box className="site-footer__terms-content">
            <Typography variant="caption">The VIP Suite ® {currentYear}</Typography>
            <Box className="site-footer__terms-links">
              {footerItems?.footer_bottom.map((item, index) => {
                const href = getLastPathSegment(item?.url);
                const name = he.decode(item?.title || '');
                return (
                  <Link href={href} key={index}>
                    {name}
                  </Link>
                );
              })}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
