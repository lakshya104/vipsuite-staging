'use client';
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  MenuItem,
  MenuList,
  Drawer,
  Typography,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import './Header.scss';
import { signOut } from 'next-auth/react';
import { ProgressBarLink } from '../ProgressBar';

const navLinks = [
  {
    label: 'Home',
    href: '/home',
  },
  {
    label: 'Opportunities',
    href: '/opportunities',
  },
  {
    label: 'Events',
    href: '/events',
  },
  {
    label: 'Inbox',
    href: '/inbox',
  },
  {
    label: 'Basket',
    href: '/basket',
  },
];

const menuItems = [
  {
    label: 'My Profile',
    icon: <Image src="/img/user.svg" alt="Logo" width={20} height={20} />,
    href: '/profile',
  },
  {
    label: 'My Orders',
    icon: <Image src="/img/basket.png" alt="Logo" width={20} height={20} priority />,
    href: '/my-orders',
  },
  { label: 'My Events', icon: <Image src="/img/calendar.svg" alt="Logo" width={20} height={20} />, href: '/my-events' },
  { label: 'My Addresses', icon: <Image src="/img/address.svg" alt="Logo" width={20} height={20} />, href: '/' },
  { label: 'My Interests', icon: <Image src="/img/star.svg" alt="Logo" width={20} height={20} />, href: '/' },
  { label: 'Login & Security', icon: <Image src="/img/security.svg" alt="Logo" width={20} height={20} />, href: '/' },
  { label: 'Contact', icon: <Image src="/img/contact.svg" alt="Logo" width={20} height={20} />, href: '/' },
  { label: 'Help & FAQs', icon: <Image src="/img/faq.svg" alt="Logo" width={20} height={20} />, href: '/' },
];

const HomeHeader = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };
  const handleLogout = () => {
    setDrawerOpen(false);
    setIsLoading(true);
    signOut();
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
              {navLinks.map((link) => (
                <ProgressBarLink href={link.href} title={link.label} key={link.href}>
                  <MenuItem>{link.label}</MenuItem>
                </ProgressBarLink>
              ))}
            </MenuList>
          </Box>

          <Box
            className="navbar-toggler"
            onClick={toggleDrawer(true)}
          >
            <span
              aria-label="account of current user"
              aria-controls="menu-appbar"
            ></span>
          </Box>
          <Drawer className='drawer-menu' anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
            <Box className="drawer-menu__wrapper" role="presentation">
              <Box className="drawer-menu__header">
                <ProgressBarLink href={'/home'} title={'THE VIP SUITE'} className='logo'>
                  <Image src="/vipsblack.png" alt="The VIP Suite Site logo" height={13} width={114} priority />
                </ProgressBarLink>
                <CloseIcon onClick={toggleDrawer(false)} />
              </Box>
              <Box className="drawer-menu__list">
                {menuItems.map((item) => (
                  <ProgressBarLink href={item.href} key={item.label}>
                    <Box
                      className="drawer-menu__item"
                      onClick={toggleDrawer(false)}
                    >
                      <Box>
                        {item.icon}
                        <Typography variant="body1">
                          {item.label}
                        </Typography>
                      </Box>
                      <ChevronRightIcon />
                    </Box>
                  </ProgressBarLink>
                ))}
                <Box
                  className="drawer-menu__item"
                  onClick={handleLogout}
                >
                  <Box>
                    <Image src="/img/signout.svg" alt="Logo" width={20} height={20} />
                    <Typography variant="body1">
                      Sign Out
                    </Typography>
                  </Box>
                  <ChevronRightIcon />
                </Box>
              </Box>
            </Box>
          </Drawer>
        </Toolbar>
      </AppBar>
      <Backdrop open={isLoading}>
        <CircularProgress />
      </Backdrop>
    </>
  );
};

export default HomeHeader;
