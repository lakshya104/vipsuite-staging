import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Box
      sx={{
        bgcolor: 'black',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Image alt="VipLogo" src="/VIPSLogo.png" width={200} height={30} priority />
      <Box textAlign="center" mt="25px">
        <Image
          src="/not-found.avif"
          width={500}
          style={{ width: 'auto', height: 'auto' }}
          height={300}
          alt="Not Found"
          priority
        />
        <Typography color="white" sx={{ fontSize: '50px', fontWeight: '800', marginBottom: '10px' }}>
          404!
        </Typography>
        <Typography fontWeight="800" color="white">
          Oops! The page you are looking for is not here.
        </Typography>
        <Link href="/home">
          <Button
            sx={{
              bgcolor: 'white',
              px: '20px',
              mt: '10px',
              color: 'black',
              fontWeight: '900',
              '&:hover': {
                bgcolor: 'white',
                color: 'black',
              },
            }}
          >
            Go Home
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
