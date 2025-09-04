'use client';

import React, { useEffect } from 'react';
import { createGrantAccessCookie } from '@/libs/actions';
import { Box } from '@mui/material';

const GrantAccess = () => {
  const handleGrant = async () => {
    try {
      await createGrantAccessCookie();
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    handleGrant();
  }, []);
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        textAlign: 'center',
      }}
    >
      <Box component="span" sx={{ fontWeight: 500 }}>
        Granting Access...
      </Box>
    </Box>
  );
};
export default GrantAccess;
