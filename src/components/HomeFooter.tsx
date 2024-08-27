import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import Image from 'next/image';
import { ProgressBarLink } from './ProgressBar';
import { map } from 'lodash';

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
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        display: { xs: 'flex', md: 'none' },
        justifyContent: 'space-around',
        alignItems: 'center',
        bgcolor: 'background.paper',
        py: 1,
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      {map(footerItems, (item) => (
        <Stack key={item.href} alignItems="center">
          <ProgressBarLink href={item.href}>
            <Image src={item.src} alt={item.alt} width={24} height={24} />
          </ProgressBarLink>
          <Typography variant="caption">{item.label}</Typography>
        </Stack>
      ))}
    </Box>
  );
};

export default HomeFooter;
