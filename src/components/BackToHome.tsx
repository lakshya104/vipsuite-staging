import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';
import { ProgressBarLink } from './ProgressBar';

const BackToHome = () => {
  return (
    <Box className="profile-builder__close">
      <ProgressBarLink href="/profile">
        <CloseIcon />
      </ProgressBarLink>
    </Box>
  );
};

export default BackToHome;
