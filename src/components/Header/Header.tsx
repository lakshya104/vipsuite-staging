'use client';
import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Box, IconButton, MenuItem, MenuList } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import Image from 'next/image';
import { navLinks } from '@/data';
import HeaderTop from '../HeaderTop/HeaderTop';
import './Header.scss';
import { useRouter } from 'next/navigation';
import { signOutAction } from '@/libs/actions';
import VIPSuiteDialog from '../VIPSuiteDialog';

interface HeaderProps {
  isLoggedIn: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const DialogBtns = [
    { href: '/signup/vip', text: 'Apply as VIP' },
    { href: '/signup/agent', text: 'Apply as Agent' },
    { href: '/signup/brand', text: 'Apply as Brand' },
  ];

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
            {isLoggedIn ? (
              <form action={signOutAction}>
                <Button variant="text" type="submit">
                  Log Out
                </Button>
              </form>
            ) : (
              <>
                <Button variant="text" onClick={() => router.push('/login')}>
                  Login
                </Button>
                <Button variant="outlined" color="inherit" onClick={() => setOpen(true)}>
                  Apply
                </Button>
                <VIPSuiteDialog
                  isOpen={open}
                  onClose={() => setOpen(false)}
                  withLogo={true}
                  withWhiteBg={false}
                  buttonsArray={DialogBtns}
                />
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
