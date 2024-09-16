import React, { Fragment } from 'react';
import Image from 'next/image';
import { Box, Button, Container, Typography } from '@mui/material';
import './SocialAccordion.scss';
import { PageData } from '@/interfaces/public-page';

interface SocialAccordionProps {
  data: PageData;
}

const SocialAccordion: React.FC<SocialAccordionProps> = ({ data }) => {
  const socialLinks = data?.acf?.content_modules?.[1]?.slides;

  return (
    <Container>
      <Box className="site-card__wrapper">
        <Box className="accordionItem">
          {socialLinks?.map((link, index) => (
            <Fragment key={index}>
              <Box className="accordionItem__link">
                <Box className="accordionItem__image">
                  <Image src={link.image.sizes?.['vs-container']} alt={link.heading} width={1024} height={430} />
                </Box>
                <Box className="accordionItem__full">
                  <Typography variant="h2">{link.heading}</Typography>
                  <Typography variant="body1">{link.copy}</Typography>
                  <Button variant="contained" type="submit" className="button button--border">
                    Find out more
                  </Button>
                </Box>
              </Box>
            </Fragment>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default SocialAccordion;
