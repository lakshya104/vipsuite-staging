import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';
import { ProgressBarLink } from './ProgressBar';

const BackToHome = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        p: 1,
        m: 4,
        right: 600,
        cursor: 'pointer',
      }}
    >
      <ProgressBarLink href="/profile">
        <CloseIcon sx={{ color: 'black' }} />
      </ProgressBarLink>
    </Box>
  );
};

export default BackToHome;
