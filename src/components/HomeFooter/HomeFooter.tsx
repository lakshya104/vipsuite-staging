import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import Image from 'next/image';
import { ProgressBarLink } from '../ProgressBar';
import { map } from 'lodash';
import './HomeFooter.scss';

const footerItems = [
  { href: '/', src: '/img/home.svg', alt: 'Home', label: 'Home' },
  { href: '/events', src: '/img/event.svg', alt: 'Events', label: 'Events' },
  { href: '/opportunities', src: '/img/opportunity.svg', alt: 'Opportunities', label: 'Opportunities' },
  { href: '/inbox', src: '/img/inbox.svg', alt: 'Inbox', label: 'Inbox' },
  { href: '/basket', src: '/img/cart.svg', alt: 'Basket', label: 'Basket' },
];

const HomeFooter = () => {
  return (
    <Box
      className="footer-menu"
      sx={{
        bgcolor: 'background.paper',
        borderColor: 'divider',
      }}
    >
      {map(footerItems, (item) => (
        <Stack key={item.href} alignItems="center">
          <ProgressBarLink href={item.href}>
            <Box className="footer-menu__icon">
              <Image src={item.src} alt={item.alt} width={24} height={24} />
              <span className='label'>0</span>
            </Box>
            <Typography variant="caption">{item.label}</Typography>
          </ProgressBarLink>
        </Stack>
      ))}
    </Box>
  );
};

export default HomeFooter;
