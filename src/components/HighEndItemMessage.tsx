'use client';
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { MessageDialogBox } from './Dialog';

const HighEndItemMessage = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleIconClick = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      sx={{ position: 'relative', width: 'fit-content', padding: 0.75, backgroundColor: '#f0f0e5', borderRadius: 2 }}
    >
      <Typography fontSize={14} variant="body1">
        High End Product
      </Typography>
      <InfoOutlinedIcon
        sx={{
          fontSize: 16,
          cursor: 'pointer',
          position: 'absolute',
          top: -5,
          right: -5,
          backgroundColor: '#f0f0e5',
          padding: 0.1,
          borderRadius: 2,
          color: 'black',
        }}
        onClick={handleIconClick}
      />
      <MessageDialogBox
        isDialogOpen={openDialog}
        onClose={handleDialogClose}
        content={{
          title: 'High End Product Information',
          description:
            'Acceptance of the terms and conditions is required for high-end items, with e-signature available on a later page.',
        }}
      />
    </Box>
  );
};

export default HighEndItemMessage;
