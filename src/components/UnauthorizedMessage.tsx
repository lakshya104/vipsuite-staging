'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Typography } from '@mui/material';
import en from '@/helpers/lang';

const UnauthorizedMessage = () => {
  const router = useRouter();
  return (
    <Box
      sx={{
        height: '60vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{
          color: 'black',
          fontWeight: '500',
        }}
      >
        {en.unauthorizedMessage.message}
      </Typography>
      <Button className="button button--black" sx={{ marginTop: 3 }} onClick={() => router.back()}>
        {en.errorFallback.goBack}
      </Button>
    </Box>
  );
};

export default UnauthorizedMessage;
