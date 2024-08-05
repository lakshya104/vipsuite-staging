import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const HomeFooter = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        display: { xs: 'flex', md: 'none' },
        justifyContent: 'space-around',
        alignItems: 'center',
        bgcolor: 'background.paper',
        py: 1,
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Stack alignItems="center">
        <Link href="/" passHref>
          <Image src="/img/home.svg" alt="Home" width={24} height={24} />
        </Link>
        <Typography variant="caption">Home</Typography>
      </Stack>
      <Stack alignItems="center">
        <Link href="/events" passHref>
          <Image src="/img/event.svg" alt="Events" width={24} height={24} />
        </Link>
        <Typography variant="caption">Events</Typography>
      </Stack>
      <Stack alignItems="center">
        <Link href="/opportunities" passHref>
          <Image src="/img/opportunity.svg" alt="Opportunities" width={24} height={24} />
        </Link>
        <Typography variant="caption">Opportunities</Typography>
      </Stack>
      <Stack alignItems="center">
        <Link href="/inbox" passHref>
          <Image src="/img/inbox.svg" alt="Inbox" width={24} height={24} />
        </Link>
        <Typography variant="caption">Inbox</Typography>
      </Stack>
      <Stack alignItems="center">
        <Link href="/basket" passHref>
          <Image src="/img/cart.svg" alt="Basket" width={24} height={24} />
        </Link>
        <Typography variant="caption">Basket</Typography>
      </Stack>
    </Box>
  );
};

export default HomeFooter;
