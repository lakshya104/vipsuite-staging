'use client';
import React, { useState } from 'react';
import { AppBar, Toolbar, Box, IconButton, MenuItem, MenuList, Menu, ClickAwayListener } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import './Header.scss';
import { paths } from '@/helpers/paths';

interface MenuItemData {
  ID: number;
  title: string;
  url: string;
  menu_item_parent: string;
  object: string;
}

interface HeaderPropr {
  menuItems: MenuItemData[];
}

const Header: React.FC<HeaderPropr> = ({ menuItems }) => {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const getChildItems = (parentId: number) => menuItems.filter((item) => item?.menu_item_parent === String(parentId));

  const handleOpenNavMenu = () => setIsMobileOpen(!isMobileOpen);
  const handleCloseNavMenu = () => setIsMobileOpen(false);

  const handleMenuToggle = (event: React.MouseEvent<HTMLElement>, parentId: number) => {
    if (openMenuId === parentId) {
      handleMenuClose();
    } else {
      setOpenMenuId(parentId);
      setAnchorEl(event.currentTarget);
    }
  };

  const handleMenuClose = () => {
    setOpenMenuId(null);
    setAnchorEl(null);
  };

  return (
    <AppBar className="site-header" position="sticky">
      <Toolbar className="site-header__wrapper">
        <Box className="navbar-toggler">
          <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
            <MenuIcon />
          </IconButton>
        </Box>

        <Box className="site-header__brand">
          <Link href={paths.landing.getHref()}>
            <Image
              className="logo-mobile"
              src="/logo-white-mobile.svg"
              alt="The VIP Suite Site black logo"
              height={25}
              width={122}
            />
            <Image
              className="white-logo"
              src="/LogoWhite.svg"
              alt="The VIP Suite Site white logo"
              height={28}
              width={122}
            />
          </Link>
        </Box>

        <ClickAwayListener onClickAway={handleMenuClose}>
          <Box className={isMobileOpen ? 'site-header__navbar showMenu' : 'site-header__navbar'}>
            <MenuList className="site-header__navigation">
              {menuItems.map((menuItem, index) => {
                const childItems = getChildItems(menuItem.ID);
                const isActive = menuItem.url === pathname;
                const isMenuOpen = openMenuId === menuItem.ID;

                return (
                  <MenuItem
                    key={menuItem.ID || index}
                    className={isActive ? 'active' : ''}
                    onClick={(event) => handleMenuToggle(event, menuItem.ID)}
                  >
                    <Link href={menuItem?.url} onClick={() => childItems.length < 1 && handleCloseNavMenu()}>
                      {menuItem.title}
                    </Link>
                    {childItems.length > 0 && <ArrowDropDownIcon />}
                    {childItems.length > 0 && (
                      <Menu
                        anchorEl={anchorEl}
                        open={isMenuOpen}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                      >
                        {childItems.map((childItem) => (
                          <MenuItem key={childItem.ID}>
                            <Link href={childItem?.url} onClick={handleCloseNavMenu}>
                              {childItem.title}
                            </Link>
                          </MenuItem>
                        ))}
                      </Menu>
                    )}
                  </MenuItem>
                );
              })}
              <MenuItem className="login-link">
                <Link href={paths.auth.login.getHref()}>Login</Link>
              </MenuItem>
            </MenuList>
          </Box>
        </ClickAwayListener>

        <Box className="site-header__user">
          <Link href={paths.auth.login.getHref()} className="button button--link">
            Login
          </Link>
          <Link href={paths.auth.onBoarding.getHref()} className="button button--white">
            Apply
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
