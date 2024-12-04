'use client';
import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const ComingSoon = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'black',
        color: 'white',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <Typography variant="h1" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', color: '#FFFFF7' }}>
        The VIP Suite Coming soon
      </Typography>
      <Typography
        gutterBottom
        variant="body1"
        align="center"
        sx={{
          color: 'lightgray',
          fontSize: '1.6rem',
          letterSpacing: '1px',
        }}
      >
        If you would like to be the first to know
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          marginTop: 4,
          width: '100%',
          maxWidth: 600,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Enter your email"
          type="email"
          fullWidth
          InputProps={{
            style: {
              backgroundColor: '#FFFFF7',
              height: '45px',
              paddingLeft: '16px',
            },
          }}
        />
        <Button
          sx={{
            textTransform: 'none',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            color: 'black',
            height: '45px',
            bgcolor: '#FFFFF7 !important',
            paddingX: 3,
            paddingY: 1.5,
          }}
        >
          Notify Me
        </Button>
      </Box>
    </Box>
  );
};

export default ComingSoon;
