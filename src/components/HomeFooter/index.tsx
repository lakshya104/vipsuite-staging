'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { map } from 'lodash';
import { Box, Typography, Stack } from '@mui/material';
import { ProgressBarLink } from '../ProgressBar';
import './HomeFooter.scss';
import { UserRole } from '@/helpers/enums';
import { brandFooterItems, vipFooterItems } from '@/data';
import { useMessageCountStore } from '@/store/useStore';

interface HomeFooterProps {
  role?: UserRole;
}

const HomeFooter: React.FC<HomeFooterProps> = ({ role = UserRole.Vip }) => {
  const pathname = usePathname();
  const { messageCount } = useMessageCountStore();

  const footerItems = role === UserRole.Brand ? brandFooterItems : vipFooterItems;
  return (
    <Box className="footer-menu">
      {map(footerItems, (item) => {
        const isActive = item.paths.some((path) => pathname.startsWith(path));
        return (
          <Stack key={item.href} alignItems="center">
            <ProgressBarLink href={item.href}>
              <Box className="footer-menu__icon">
                <Image src={isActive ? item.srcselected : item.src} alt={item.alt} width={24} height={24} />
                {(item.label === 'Inbox' || item.label === 'My Orders') && (
                  <span className="label">{messageCount}</span>
                )}
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
