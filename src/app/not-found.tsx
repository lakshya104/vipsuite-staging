'use client';
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import en from '@/helpers/lang';
import { useRouter } from 'next/navigation';
import HomeHeader from '@/components/Header';
import HomeFooter from '@/components/HomeFooter';

export default function NotFound() {
  const router = useRouter();
  return (
    <>
      <HomeHeader />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
        <Box textAlign="center" mt="25px">
          <Typography color="black" sx={{ fontSize: '42px', fontWeight: '800', marginBottom: '10px' }}>
            {en.errorFallback[404]}
          </Typography>
          <Typography fontWeight="800" color="black">
            {en.errorFallback.notAvailable}
          </Typography>
          <Button className="button button--black" sx={{ marginTop: 3 }} onClick={() => router.back()}>
            {en.errorFallback.goBack}
          </Button>
        </Box>
      </Box>
      <HomeFooter />
    </>
  );
}
