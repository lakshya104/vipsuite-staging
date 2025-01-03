import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import '../../components/ComingSoon/comingsoon.scss';

const ComingSoonLoading = () => {
  return (
    <Box className="coming-soon__page">
      <Typography variant="h1" gutterBottom>
        The VIP Suite Coming soon
      </Typography>
      <Typography className="coming-soon__desc" gutterBottom variant="body1" align="center">
        If you would like to be the first to know
      </Typography>

      <Box className="coming-soon__form" component="form">
        <TextField className="coming-soon__wrapper" />
        <Button type="submit">Notify Me</Button>
      </Box>
    </Box>
  );
};

export default ComingSoonLoading;
