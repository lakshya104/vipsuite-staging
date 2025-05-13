import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import AndroidIcon from '@mui/icons-material/Android';
import AppleIcon from '@mui/icons-material/Apple';

export default async function Page() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        flexDirection: 'column',
      }}
    >
      <Image src="/Logo.svg" alt="Logo" width={200} height={100} style={{ marginBottom: '48px' }} priority />
      <Box
        sx={{
          maxWidth: '600px',
          padding: '32px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <Typography align="center">If the app does not open,</Typography>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={2}
          mt={2}
          flexDirection={{ xs: 'column', md: 'row' }}
        >
          <Button variant="outlined" startIcon={<AndroidIcon />}>
            <a href="https://play.google.com/store/apps/details?id=co.uk.thevipsuite.predev">Download for Android</a>
          </Button>
          <Button variant="outlined" startIcon={<AppleIcon />}>
            <a href="https://apps.apple.com/app/idco.uk.thevipsuite.predev">Download for iOS</a>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
