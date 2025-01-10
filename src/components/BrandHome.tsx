import React from 'react';
import { Box, Typography } from '@mui/material';

interface BrandHomeProps {
  firstName: string;
}
const BrandHome: React.FC<BrandHomeProps> = ({ firstName }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mt: 5,
        gap: 15,
        flexDirection: 'column',
      }}
    >
      <Typography variant="h2">Welcome back, {firstName}</Typography>
      <Typography textAlign="center" variant="h1">
        Coming soon...
      </Typography>
    </Box>
  );
};

export default BrandHome;
