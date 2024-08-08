import React from 'react';
import { Box, Container, Link, Typography } from '@mui/material';
import './Footer.scss';

const Footer = () => {
  return (
    <Box className="site-footer" py={2}>
      <Container>
        <Typography variant="body1" align='center'>
          {'Copyright © '}
          <Link color="inherit" href="/">
            The VIP Suite
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
