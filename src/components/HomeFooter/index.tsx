'use client';
import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { map } from 'lodash';
import { Box, Typography, Stack } from '@mui/material';
import { ProgressBarLink } from '../ProgressBar';
import './HomeFooter.scss';
import { UserRole } from '@/helpers/enums';
import { brandFooterItems, vipFooterItems } from '@/data';

interface HomeFooterProps {
  role: UserRole;
}

const HomeFooter: React.FC<HomeFooterProps> = ({ role }) => {
  const [showFooter, setShowFooter] = useState(true);
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

  const footerItems = role === UserRole.Brand ? brandFooterItems : vipFooterItems;
  return (
    <Box className={`footer-menu ${showFooter ? 'show' : 'hide'}`}>
      {map(footerItems, (item) => {
        const isActive = item.paths.some((path) => pathname.startsWith(path));
        return (
          <Stack key={item.href} alignItems="center">
            <ProgressBarLink href={item.href}>
              <Box className="footer-menu__icon">
                <Image src={isActive ? item.srcselected : item.src} alt={item.alt} width={24} height={24} />
                {/* {orderCount !== 0 && item.label === 'My Orders' && <span className="label">{orderCount}</span>} */}
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
