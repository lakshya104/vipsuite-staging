'use client';
import React, { useState } from 'react';
import { AppBar, Toolbar, Box, IconButton, MenuItem, MenuList, Drawer, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import Image from 'next/image';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import './Header.scss';
import { signOut } from "next-auth/react"

const navLinks = [
  {
    label: 'Home',
    href: '/home',
  },
  {
    label: 'Opportunities',
    href: '/opprotunities',
  },
  {
    label: 'Events',
    href: '/events?type=events',
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
    href: '/profile?section=bio',
  },
  { label: 'My Orders', icon: <Image src="/img/basket.png" alt="Logo" width={20} height={20} />, href: '/my-orders' },
  { label: 'My Events', icon: <Image src="/img/calendar.svg" alt="Logo" width={20} height={20} />, href: '/my-events' },
  { label: 'My Addresses', icon: <Image src="/img/address.svg" alt="Logo" width={20} height={20} />, href: '/' },
  { label: 'My Interests', icon: <Image src="/img/star.svg" alt="Logo" width={20} height={20} />, href: '/' },
  { label: 'Login & Security', icon: <Image src="/img/security.svg" alt="Logo" width={20} height={20} />, href: '/' },
  { label: 'Contact', icon: <Image src="/img/contact.svg" alt="Logo" width={20} height={20} />, href: '/' },
  { label: 'Help & FAQs', icon: <Image src="/img/faq.svg" alt="Logo" width={20} height={20} />, href: '/' },
];

const HomeHeader = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar className="site-header" position="sticky">
        <Toolbar className="site-header__wrapper">
          <Box className="site-header__brand">
            <Link href={'/home'} title={'THE VIP SUITE'}>
              <Image src="/Logo.svg" alt="The VIP Suite Site logo" height={25} width={122} priority />
            </Link>
          </Box>

          <Box className="site-header__navbar">
            <MenuList className="site-header__navigation">
              {navLinks.map((link) => (
                <MenuItem key={link.href}>
                  <Link href={link.href} title={link.label}>
                    {link.label}
                  </Link>
                </MenuItem>
              ))}
            </MenuList>
          </Box>

          <Box>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleDrawer(true)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)} sx={{ width: '100vw' }}>
            <Box sx={{ width: 250 }} role="presentation">
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
                <CloseIcon sx={{ cursor: 'pointer' }} onClick={toggleDrawer(false)} />
              </Box>
              {menuItems.map((item) => (
                <Box
                  key={item.label}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 2,
                    borderBottom: '1px solid #e0e0e0',
                    cursor: 'pointer',
                  }}
                  onClick={toggleDrawer(false)}
                >
                  <Link href={item.href}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {item.icon}
                      <Typography variant="body1" sx={{ ml: 2, fontSize: '13px' }}>
                        {item.label}
                      </Typography>
                    </Box>
                  </Link>
                  <ChevronRightIcon />
                </Box>
              ))}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 2,
                  borderBottom: '1px solid #e0e0e0',
                  cursor: 'pointer',
                }}
                onClick={() => signOut()}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Image src="/img/signout.svg" alt="Logo" width={20} height={20} />
                  <Typography variant="body1" sx={{ ml: 2, fontSize: '13px' }}>
                    Sign Out
                  </Typography>
                </Box>
                <ChevronRightIcon />
              </Box>
            </Box>
          </Drawer>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default HomeHeader;
