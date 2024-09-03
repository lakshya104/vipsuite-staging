'use client'
import React, { useEffect, useState } from 'react';
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
  const [showFooter, setShowFooter] = useState(true);
  let lastScrollY = 0;

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY) {
          // Scrolling down
          setShowFooter(false);
        } else {
          // Scrolling up
          setShowFooter(true);
        }

        lastScrollY = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box className={`footer-menu ${showFooter ? 'show' : 'hide'}`}>
      {map(footerItems, (item) => (
        <Stack key={item.href} alignItems="center">
          <ProgressBarLink href={item.href}>
            <Box className="footer-menu__icon">
              <Image src={item.src} alt={item.alt} width={24} height={24} />
              {(item.label === 'Inbox' || item.label === 'Basket') && <span className="label">0</span>}
            </Box>
            <Typography variant="caption">{item.label}</Typography>
          </ProgressBarLink>
        </Stack>
      ))}
    </Box>
  );
};

export default HomeFooter;
