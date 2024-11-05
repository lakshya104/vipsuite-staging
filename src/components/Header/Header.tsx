'use client';
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Box, IconButton, MenuItem, MenuList, Menu, ClickAwayListener } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { GetMenuItems } from '@/libs/api-manager/manager';
import HeaderSkeleton from './loading';
import './Header.scss';
import { getLastPathSegment } from '@/helpers/utils';

interface MenuItemData {
  ID: number;
  title: string;
  url: string;
  menu_item_parent: string;
  object: string; // added to track type of object
}

const Header = () => {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const data: MenuItemData[] = await GetMenuItems();
        const updatedMenuItems = data.map((item) => {
          if (item?.object === 'page' || item?.object === 'post') {
            item.url = getLastPathSegment(item.url);
          }
          return item;
        });
        setMenuItems(updatedMenuItems);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching menu items:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenuItems();
  }, []);

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
          <Link href="/">
            <Image src="/Logo.svg" alt="The VIP Suite Site logo" height={25} width={122} />
          </Link>
        </Box>

        <ClickAwayListener onClickAway={handleMenuClose}>
          <Box className={isMobileOpen ? 'site-header__navbar showMenu' : 'site-header__navbar'}>
            <MenuList className="site-header__navigation">
              {loading
                ? Array.from(new Array(5)).map((_, index) => <HeaderSkeleton key={index} />)
                : menuItems
                    .filter((item) => item.menu_item_parent === '0')
                    .map((parentItem) => {
                      const childItems = getChildItems(parentItem.ID);
                      const isActive = parentItem.url === pathname;
                      const isMenuOpen = openMenuId === parentItem.ID;

                      return (
                        <MenuItem
                          key={parentItem.ID}
                          className={isActive ? 'active' : ''}
                          onClick={(event) => handleMenuToggle(event, parentItem.ID)}
                        >
                          <Link href={parentItem.url} onClick={() => childItems.length < 1 && handleCloseNavMenu()}>
                            {parentItem.title}
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
                                  <Link href={childItem.url} onClick={handleCloseNavMenu}>
                                    {childItem.title}
                                  </Link>
                                </MenuItem>
                              ))}
                            </Menu>
                          )}
                        </MenuItem>
                      );
                    })}
              <MenuItem sx={{ display: { md: 'none' } }}>
                <Link href="/login">Login</Link>
              </MenuItem>
            </MenuList>
          </Box>
        </ClickAwayListener>

        <Box className="site-header__user">
          <Link href="/login" className="button button--link">
            Login
          </Link>
          <Link href="/on-boarding" className="button button--white">
            Apply
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
