'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { AppBar, Toolbar, Box, MenuItem, MenuList, Drawer, Typography, Backdrop } from '@mui/material';
import Image from 'next/image';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import './Header.scss';
import { ProgressBarLink } from '../ProgressBar';
import { LogOut } from '@/libs/api-manager/manager';
import UseToaster from '@/hooks/useToaster';
import Toaster from '../Toaster';
import { deleteVipCookies } from '@/libs/actions';
import { useUserInfoStore } from '@/store/useStore';
import { UserRole } from '@/helpers/enums';
import { SignOutLoading } from './loading';

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
    label: 'Messages',
    href: '/my-orders',
    paths: ['/my-orders'],
  },
  {
    label: 'My Profile',
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

const agentMenuItems = [
  {
    label: 'Agent Profile',
    icon: <Image src={'/img/user.svg'} alt="Logo" width={20} height={20} priority />,
    href: '/agent-profile',
  },
  {
    label: 'My VIPs',
    icon: <Image src="/img/star.svg" alt="Logo" width={20} height={20} />,
    href: '/my-vips',
  },
  {
    label: 'Basket',
    icon: <Image src="/img/basket.png" alt="Logo" width={20} height={20} priority />,
    href: '/basket',
  },
  // { label: 'VIP Orders', icon: <Image src="/img/contact.svg" alt="Logo" width={20} height={20} />, href: '/my-orders' },
  {
    label: 'VIP Events',
    icon: <Image src="/img/calendar.svg" alt="Logo" width={20} height={20} />,
    href: '/my-events',
  },
  {
    label: 'VIP Addresses',
    icon: <Image src="/img/address.svg" alt="Logo" width={20} height={20} />,
    href: '/my-addresses',
  },
  // {
  //   label: 'VIP Interests',
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

interface HomeHeaderProps {
  token?: string;
  role?: string;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ token, role }) => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const pathname = usePathname();
  const menuItems = role === UserRole.Vip ? vipMenuItems : agentMenuItems;
  const { clearAll } = useUserInfoStore();
  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };
  const handleLogout = async () => {
    if (token) {
      try {
        setDrawerOpen(false);
        setIsLoading(true);
        await LogOut(token);
        signOut();
        clearAll();
      } catch (error) {
        setIsLoading(false);
        openToaster('Error during logging out. ' + error);
      } finally {
        await deleteVipCookies();
        localStorage.clear();
      }
    }
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

          <Box className="navbar-toggler" onClick={toggleDrawer(true)}>
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
                {menuItems.map((item) => (
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
                <Box className="drawer-menu__item" onClick={handleLogout}>
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
      <Backdrop
        sx={{
          zIndex: 10000,
          backgroundColor: '#fffff7',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'column',
          width: '100vw',
        }}
        open={isLoading}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'column',
            width: '100%',
            height: '50vh',
          }}
        >
          <SignOutLoading />
        </Box>
      </Backdrop>
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity="error" />
    </>
  );
};

export default HomeHeader;
