'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import Image from 'next/image';
import { ProgressBarLink } from '../ProgressBar';
import { map } from 'lodash';
import './HomeFooter.scss';
import { usePathname } from 'next/navigation';
import { GetAllOrdersClient } from '@/libs/api-manager/manager';
import { useOrderStore, useUserInfoStore } from '@/store/useStore';

interface HomeFooterProps {
  token: string;
  id: number;
}

const HomeFooter: React.FC<HomeFooterProps> = ({ token, id }) => {
  const [showFooter, setShowFooter] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { setOrderCount, orderCount } = useOrderStore();
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const { vipIdStore, userRoleStore } = useUserInfoStore();

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

  useEffect(() => {
    const fetchCart = async (token: string, id: number, vipId: number) => {
      setIsLoading(true);
      try {
        const allOrders = await GetAllOrdersClient(token, id, vipId);
        setOrderCount(allOrders.length);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
      setIsLoading(false);
    };
    if (token && id && vipIdStore) fetchCart(token, id, vipIdStore);
  }, [token, id, vipIdStore, setOrderCount]);

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
      href: '/my-orders',
      src: '/img/basket.png',
      alt: 'My-Orders',
      label: 'My Orders',
      paths: ['/my-orders'],
      srcselected: '/img/basket.png',
    },
  ];

  const agentFooterItems = [
    {
      href: '/agent-home',
      src: '/img/home.svg',
      alt: 'Home',
      label: 'Home',
      paths: ['/agent-home', '/agent-brands/', '/agent-product'],
      srcselected: '/img/home-selected.svg',
    },
    {
      href: '/agent-opportunities',
      src: '/img/opportunity.svg',
      alt: 'Opportunities',
      label: 'Opportunities',
      paths: ['/agent-opportunities'],
      srcselected: '/img/opportunities-selected.svg',
    },
    {
      href: '/agent-events',
      src: '/img/event.svg',
      alt: 'Events',
      label: 'Events',
      paths: ['/agent-events'],
      srcselected: '/img/events-selected.svg',
    },
    {
      href: '/agent-inbox',
      src: '/img/inbox.svg',
      alt: 'Inbox',
      label: 'Inbox',
      paths: ['/agent-inbox'],
      srcselected: '/img/inbox-selected.svg',
    },
    {
      href: '/agent-orders',
      src: '/img/basket.png',
      alt: 'My-Orders',
      label: 'My Orders',
      paths: ['/agent-orders'],
      srcselected: '/img/basket.png',
    },
  ];
  const footerItems = userRoleStore === 'vip' ? vipFooterItems : agentFooterItems;

  return (
    <Box className={`footer-menu ${showFooter ? 'show' : 'hide'}`}>
      {map(footerItems, (item) => {
        const isActive = item.paths.some((path) => pathname.startsWith(path));
        return (
          <Stack key={item.href} alignItems="center">
            <ProgressBarLink href={item.href}>
              <Box className="footer-menu__icon">
                <Image src={isActive ? item.srcselected : item.src} alt={item.alt} width={24} height={24} />
                {!isLoading && orderCount !== 0 && item.label === 'My Orders' && (
                  <span className="label">{orderCount}</span>
                )}
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
