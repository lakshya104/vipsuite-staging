'use client';
import React, { useState, useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
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
import Image from 'next/image';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import './Header.scss';
import { ProgressBarLink } from '../ProgressBar';
import { LogOut } from '@/libs/api-manager/manager';
import UseToaster from '@/hooks/useToaster';
import Toaster from '../Toaster';
import { useUserInfoStore } from '@/store/useStore';
import { UserRole } from '@/helpers/enums';
import { signOutAction } from '@/libs/actions';
import { brandNavLinks, vipNavLinks } from '@/data';
import { paths } from '@/helpers/paths';

const vipMenuItems = [
  {
    label: 'Basket',
    icon: <Image src="/img/basket.png" alt="Logo" width={20} height={20} priority />,
    href: paths.root.basket.getHref(),
  },
  {
    label: 'My Addresses',
    icon: <Image src="/img/address.svg" alt="Logo" width={20} height={20} />,
    href: paths.root.addresses.getHref(),
  },
  {
    label: 'Login & Security',
    icon: <Image src="/img/security.svg" alt="Logo" width={20} height={20} />,
    href: paths.root.loginSecurity.getHref(),
  },
  {
    label: 'Contact',
    icon: <Image src="/img/contact.svg" alt="Logo" width={20} height={20} />,
    href: paths.root.contact.getHref(),
  },
  {
    label: 'Help & FAQs',
    icon: <Image src="/img/faq.svg" alt="Logo" width={20} height={20} />,
    href: paths.root.contact.getHref(),
  },
];

const agentMenuItems = [
  {
    label: 'My VIPs',
    icon: <Image src="/img/star.svg" alt="Logo" width={20} height={20} />,
    href: paths.root.myVips.getHref(),
  },
  {
    label: 'Basket',
    icon: <Image src="/img/basket.png" alt="Logo" width={20} height={20} priority />,
    href: paths.root.basket.getHref(),
  },
  {
    label: 'VIP Addresses',
    icon: <Image src="/img/address.svg" alt="Logo" width={20} height={20} />,
    href: paths.root.addresses.getHref(),
  },
  {
    label: 'Login & Security',
    icon: <Image src="/img/security.svg" alt="Logo" width={20} height={20} />,
    href: paths.root.loginSecurity.getHref(),
  },
  {
    label: 'Contact',
    icon: <Image src="/img/contact.svg" alt="Logo" width={20} height={20} />,
    href: paths.root.contact.getHref(),
  },
  {
    label: 'Help & FAQs',
    icon: <Image src="/img/faq.svg" alt="Logo" width={20} height={20} />,
    href: paths.root.helpFaq.getHref(),
  },
];

interface HomeHeaderProps {
  role?: UserRole;
  token: string;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ role, token }) => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const pathname = usePathname();
  const router = useRouter();
  const menuItems =
    role === UserRole.Vip ? vipMenuItems : role === UserRole.Brand ? [] : role === UserRole.Agent ? agentMenuItems : [];

  const navLinks = role === UserRole.Brand ? brandNavLinks : vipNavLinks;
  const { clearAll } = useUserInfoStore();
  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };
  const handleLogout = async () => {
    setDrawerOpen(false);
    startTransition(async () => {
      try {
        await Promise.all([LogOut(token), clearAll(), signOutAction()]);
        router.push(paths.landing.getHref());
      } catch (error) {
        openToaster('Error during logging out. ' + error);
      }
    });
  };

  return (
    <>
      <AppBar className="site-header site-header__logged" position="sticky">
        <Toolbar className="site-header__wrapper">
          <Box className="site-header__brand">
            <ProgressBarLink href={paths.root.home.getHref()} title={'THE VIP SUITE'}>
              <Image src="/Logo.svg" alt="The VIP Suite Site logo" height={25} width={122} priority />
            </ProgressBarLink>
          </Box>

          <Box className="site-header__navbar">
            <MenuList className="site-header__navigation">
              {navLinks.map((link) => {
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
                <ProgressBarLink href={paths.root.home.getHref()} title={'THE VIP SUITE'} className="logo">
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
      <Backdrop sx={{ color: '#fff', zIndex: 100000 }} open={isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity="error" />
    </>
  );
};

export default HomeHeader;
