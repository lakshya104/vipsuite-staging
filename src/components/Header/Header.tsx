'use client';
import React, { useState } from 'react';
import { AppBar, Toolbar, Box, IconButton, MenuItem, MenuList } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import Image from 'next/image';
import { navLinks } from '@/data';
import HeaderTop from '../HeaderTop/HeaderTop';
import './Header.scss';

const Header = () => {
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const handleOpenNavMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleCloseNavMenu = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      <HeaderTop />
      <AppBar className="site-header" position="sticky">
        <Toolbar className="site-header__wrapper">
          <Box className="navbar-toggler">
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Box className="site-header__brand">
            <Link href={'/'} title={'THE VIP SUITE'}>
              <Image src="/Logo.svg" alt="The VIP Suite Site logo" height={25} width={122} />
            </Link>
          </Box>
          <Box className={isMobileOpen ? 'site-header__navbar showMenu' : 'site-header__navbar'}>
            <MenuList className="site-header__navigation">
              {navLinks.map((link) => (
                <MenuItem key={link.href}>
                  <Link href={link.href} title={link.label} onClick={handleCloseNavMenu}>
                    {link.label}
                  </Link>
                </MenuItem>
              ))}
            </MenuList>
          </Box>
          <Box className="site-header__user">
            <Link href={'/login'}>Login</Link>
            <Link href={'/onboarding'}>Apply</Link>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
