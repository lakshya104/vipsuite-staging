'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import Image from 'next/image';
import { ProgressBarLink } from '../ProgressBar';
import { map } from 'lodash';
import './HomeFooter.scss';
import { usePathname } from 'next/navigation';
import { GetAllOrdersClient } from '@/libs/api-manager/manager';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useOrderStore } from '@/store/useStore';

const footerItems = [
  { href: '/', src: '/img/home.svg', alt: 'Home', label: 'Home', paths: ['/home', '/brands/', '/product'] },
  {
    href: '/opportunities',
    src: '/img/opportunity.svg',
    alt: 'Opportunities',
    label: 'Opportunities',
    paths: ['/opportunities'],
  },
  { href: '/events', src: '/img/event.svg', alt: 'Events', label: 'Events', paths: ['/events'] },
  { href: '/inbox', src: '/img/inbox.svg', alt: 'Inbox', label: 'Inbox', paths: ['/inbox'] },
  { href: '/my-orders', src: '/img/basket.png', alt: 'My-Orders', label: 'My Orders', paths: ['/my-orders'] },
];

const HomeFooter = () => {
  const [showFooter, setShowFooter] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { setOrderCount, orderCount } = useOrderStore();
  const user = useCurrentUser();
  const token = user?.token;
  const id = user?.id;
  const vipId = user?.vip_profile_id;
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
    if (token && id && vipId) fetchCart(token, id, vipId);
  }, [token, id, vipId, setOrderCount]);

  return (
    <Box className={`footer-menu ${showFooter ? 'show' : 'hide'}`}>
      {map(footerItems, (item) => {
        const isActive = item.paths.some((path) => pathname.startsWith(path));
        return (
          <Stack key={item.href} alignItems="center">
            <ProgressBarLink href={item.href}>
              <Box className="footer-menu__icon">
                <Image src={item.src} alt={item.alt} width={24} height={24} />
                {!isLoading && item.label === 'My Orders' && <span className="label">{orderCount}</span>}
                {/* {(item.label === 'Inbox' || item.label === 'My Orders') && <span className="label">{orderCount}</span>} */}
              </Box>
              <Typography
                sx={
                  isActive
                    ? {
                        fontWeight: 700,
                        color: 'black',
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: '-2px',
                          left: 0,
                          width: '100%',
                          height: '2px',
                          backgroundColor: 'black',
                        },
                      }
                    : {}
                }
                className={isActive ? 'active' : ''}
                variant="caption"
              >
                {item.label}
              </Typography>
            </ProgressBarLink>
          </Stack>
        );
      })}
    </Box>
  );
};

export default HomeFooter;
