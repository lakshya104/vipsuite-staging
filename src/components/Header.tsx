import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { navLinks } from '@/data';
import { auth, signOut } from '@/auth';
import { revalidatePath } from 'next/cache';
import HeaderTop from './HeaderTop/HeaderTop';

const Header = async () => {
  const session = await auth();
  const isLoggedIn = session?.user ? true : false;
  return (
    <>
      <HeaderTop />
      <AppBar position="static" color="default" sx={{ background: 'white' }}>
        <Toolbar
          sx={{
            display: 'flex',
            width: '100',
            justifyContent: 'space-between',
            marginX: '50px',
          }}
        >
          <Box>
            <Image src="/Logo.png" alt="logo" height={30} width={70} />
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              spaceX: 6,
            }}
          >
            {navLinks.map((link) => (
              <Button href={link.href} sx={{ color: 'black' }} key={link.href} LinkComponent={Link}>
                {link.label}
              </Button>
            ))}
          </Box>
          <Box display="flex" alignItems="center">
            {isLoggedIn ? (
              <form
                action={async () => {
                  'use server';
                  await signOut();
                  revalidatePath('/');
                }}
              >
                <Button sx={{ display: { xs: 'none', md: 'flex' } }} color="inherit" type="submit">
                  Sign Out
                </Button>
              </form>
            ) : (
              <Button
                variant="text"
                sx={{ display: { xs: 'none', md: 'flex' } }}
                color="inherit"
                LinkComponent={Link}
                href="/login"
              >
                Login
              </Button>
            )}
            <Button
              variant="outlined"
              color="inherit"
              sx={{ borderRadius: '25px', paddingX: { xs: '10px', md: '25px' } }}
            >
              Apply Now
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
