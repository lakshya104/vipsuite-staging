'use client';
import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { map } from 'lodash';
import { Box, Typography, Stack } from '@mui/material';
import { ProgressBarLink } from '../ProgressBar';
import './HomeFooter.scss';
import { useOrderStore } from '@/store/useStore';

const HomeFooter = () => {
  const [showFooter, setShowFooter] = useState(true);
  const { orderCount } = useOrderStore();
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY.current) {
          setShowFooter(false);
        } else {
          setShowFooter(true);
        }
        lastScrollY.current = currentScrollY;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const vipFooterItems = [
    {
      href: '/home',
      src: '/img/home.svg',
      alt: 'Home',
      label: 'Home',
      paths: ['/home', '/brands/', '/product'],
      srcselected: '/img/home-selected.svg',
    },
    {
      href: '/opportunities',
      src: '/img/opportunity.svg',
      alt: 'Opportunities',
      label: 'Opportunities',
      paths: ['/opportunities'],
      srcselected: '/img/opportunities-selected.svg',
    },
    {
      href: '/events',
      src: '/img/event.svg',
      alt: 'Events',
      label: 'Events',
      paths: ['/events'],
      srcselected: '/img/events-selected.svg',
    },
    {
      href: '/inbox',
      src: '/img/inbox.svg',
      alt: 'Inbox',
      label: 'Inbox',
      paths: ['/inbox'],
      srcselected: '/img/inbox-selected.svg',
    },
    {
      href: '/profile',
      src: '/img/user.svg',
      alt: 'My Profile',
      label: 'My Profile',
      paths: ['/profile'],
      srcselected: '/img/user-selected.svg',
    },
  ];
  return (
    <Box className={`footer-menu ${showFooter ? 'show' : 'hide'}`}>
      {map(vipFooterItems, (item) => {
        const isActive = item.paths.some((path) => pathname.startsWith(path));
        return (
          <Stack key={item.href} alignItems="center">
            <ProgressBarLink href={item.href}>
              <Box className="footer-menu__icon">
                <Image src={isActive ? item.srcselected : item.src} alt={item.alt} width={24} height={24} />
                {orderCount !== 0 && item.label === 'My Orders' && <span className="label">{orderCount}</span>}
                {/* {(item.label === 'Inbox' || item.label === 'My Orders') && <span className="label">{orderCount}</span>} */}
              </Box>
              <Typography variant="caption">{item.label}</Typography>
            </ProgressBarLink>
          </Stack>
        );
      })}
    </Box>
  );
};

export default HomeFooter;
