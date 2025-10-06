'use client';

import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import en from '@/helpers/lang';

export default function NotFound() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f8f9fa',
      }}
    >
      <Box
        sx={{
          padding: '24px 48px',
          backgroundColor: 'white',
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image src="/vipsblack.png" alt="The VIP Suite Site logo" height={13} width={114} priority />
      </Box>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px',
        }}
      >
        <Box
          sx={{
            maxWidth: '600px',
            width: '100%',
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '48px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            textAlign: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#1a1a1a',
              marginBottom: '16px',
              lineHeight: 1,
            }}
          >
            {en.errorFallback[404]}
          </Typography>

          <Typography
            sx={{
              fontSize: '16px',
              color: '#666',
              lineHeight: '1.6',
              marginBottom: '32px',
            }}
          >
            {en.errorFallback.notAvailable}
          </Typography>

          <Button
            onClick={handleGoHome}
            sx={{
              backgroundColor: '#1a1a1a',
              color: 'white',
              padding: '12px 32px',
              fontSize: '16px',
              fontWeight: '600',
              textTransform: 'none',
              borderRadius: '8px',
              transition: 'all 0.3s ease',
            }}
          >
            {en.errorFallback.goBack}
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          padding: '24px',
          textAlign: 'center',
          borderTop: '1px solid #e0e0e0',
          backgroundColor: 'white',
        }}
      >
        <Typography sx={{ fontSize: '14px', color: '#999' }}>
          © {new Date().getFullYear()} The VIP Suite. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
