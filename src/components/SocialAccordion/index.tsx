import React, { Fragment } from 'react';
import Image from 'next/image';
import { Box, Button, Container, Typography } from '@mui/material';
import './SocialAccordion.scss';

const socialLinks = [
  {
    imgSrc: '/img/events.svg',
    name: 'Events',
    description:
      'Access profiled celebrities and influencers direct to their personal email address and send product out, through our storage facility, direct to their door.',
  },
  {
    imgSrc: '/img/gifting.svg',
    name: 'Gifting',
    description:
      'Access profiled celebrities and influencers direct to their personal email address and send product out, through our storage facility, direct to their door.',
  },
  {
    imgSrc: '/img/campaigns.svg',
    name: 'Campaigns',
    description:
      'Access profiled celebrities and influencers direct to their personal email address and send product out, through our storage facility, direct to their door.',
  },
  {
    imgSrc: '/img/profiling.svg',
    name: 'Profiling',
    description:
      'Access profiled celebrities and influencers direct to their personal email address and send product out, through our storage facility, direct to their door.',
  },
];

const SocialAccordion = () => {
  return (
    <Container>
      <Box className="site-card__wrapper">
        <Box className="accordionItem">
          {socialLinks.map((link, index) => (
            <Fragment key={index}>
              <Box className="accordionItem__link">
                <Box className="accordionItem__image">
                  <Image src={link.imgSrc} alt={link.name} width={1024} height={430} />
                </Box>
                <Box className="accordionItem__full">
                  <Typography variant="h2">{link.name}</Typography>
                  <Typography variant="body1">{link.description}</Typography>
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
