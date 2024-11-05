'use client';
import React, { useState } from 'react';
import { AppBar, Toolbar, Box, MenuItem, MenuList, Drawer, Typography, Skeleton } from '@mui/material';
import Image from 'next/image';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import './Header.scss';
import { ProgressBarLink } from '../ProgressBar';
import { usePathname } from 'next/navigation';
import LandingPageLoading from '@/site-pages/LandingPage/loading';

const HeaderSkeleton = () => {
  return (
    <Box>
      <MenuList className="site-header__navigation">
        <MenuItem>
          <Skeleton variant="text" width={80} height={40} />
        </MenuItem>
      </MenuList>
    </Box>
  );
};

export default HeaderSkeleton;

const vipNavLinks = [
  {
    label: 'Home',
    href: '/home',
    paths: ['/home', '/brands/', '/product'],
  },
  {
    label: 'Opportunities',
    href: '/opportunities',
    paths: ['/opportunities'],
  },
  {
    label: 'Events',
    href: '/events',
    paths: ['/events'],
  },
  {
    label: 'Inbox',
    href: '/inbox',
    paths: ['/inbox', '/my-orders'],
  },
  {
    label: 'Profile',
    href: '/profile',
    paths: ['/profile'],
  },
];

const vipMenuItems = [
  {
    label: 'Basket',
    icon: <Image src="/img/basket.png" alt="Logo" width={20} height={20} priority />,
    href: '/basket',
  },
  { label: 'My Events', icon: <Image src="/img/calendar.svg" alt="Logo" width={20} height={20} />, href: '/my-events' },
  {
    label: 'My Addresses',
    icon: <Image src="/img/address.svg" alt="Logo" width={20} height={20} />,
    href: '/my-addresses',
  },
  // {
  //   label: 'My Interests',
  //   icon: <Image src="/img/star.svg" alt="Logo" width={20} height={20} />,
  //   href: '/my-interests',
  // },
  {
    label: 'Login & Security',
    icon: <Image src="/img/security.svg" alt="Logo" width={20} height={20} />,
    href: '/login-security',
  },
  { label: 'Contact', icon: <Image src="/img/contact.svg" alt="Logo" width={20} height={20} />, href: '/contact' },
  { label: 'Help & FAQs', icon: <Image src="/img/faq.svg" alt="Logo" width={20} height={20} />, href: '/help-faq' },
];

export const SignOutLoading = () => {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };
  return (
    <>
      <AppBar className="site-header site-header__logged" position="sticky">
        <Toolbar className="site-header__wrapper">
          <Box className="site-header__brand">
            <ProgressBarLink href={'/home'} title={'THE VIP SUITE'}>
              <Image src="/Logo.svg" alt="The VIP Suite Site logo" height={25} width={122} priority />
            </ProgressBarLink>
          </Box>

          <Box className="site-header__navbar">
            <MenuList className="site-header__navigation">
              {vipNavLinks.map((link) => {
                const isActive = link.paths.some((path) => pathname.startsWith(path));
                return (
                  <MenuItem
                    key={link.href}
                    sx={
                      isActive
                        ? {
                            fontWeight: 500,
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
                  >
                    <ProgressBarLink href={link.href} title={link.label}>
                      {link.label}
                    </ProgressBarLink>
                  </MenuItem>
                );
              })}
            </MenuList>
          </Box>

          <Box className="navbar-toggler">
            <span aria-label="account of current user" aria-controls="menu-appbar"></span>
          </Box>
          <Drawer className="drawer-menu" anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
            <Box className="drawer-menu__wrapper" role="presentation">
              <Box className="drawer-menu__header">
                <ProgressBarLink href={'/home'} title={'THE VIP SUITE'} className="logo">
                  <Image src="/vipsblack.png" alt="The VIP Suite Site logo" height={13} width={114} priority />
                </ProgressBarLink>
                <CloseIcon onClick={toggleDrawer(false)} />
              </Box>
              <Box className="drawer-menu__list">
                {vipMenuItems.map((item) => (
                  <ProgressBarLink href={item.href} key={item.label}>
                    <Box className="drawer-menu__item" onClick={toggleDrawer(false)}>
                      <Box>
                        {item.icon}
                        <Typography variant="body1">{item.label}</Typography>
                      </Box>
                      <ChevronRightIcon />
                    </Box>
                  </ProgressBarLink>
                ))}
                <Box className="drawer-menu__item">
                  <Box>
                    <Image src="/img/signout.svg" alt="Logo" width={20} height={20} />
                    <Typography variant="body1">Sign Out</Typography>
                  </Box>
                  <ChevronRightIcon />
                </Box>
              </Box>
            </Box>
          </Drawer>
        </Toolbar>
      </AppBar>
      <LandingPageLoading />
    </>
  );
};
