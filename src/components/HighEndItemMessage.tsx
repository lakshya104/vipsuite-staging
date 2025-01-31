'use client';
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { MessageDialogBox } from './Dialog';
import en from '@/helpers/lang';

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
      sx={{
        position: 'relative',
        width: 'fit-content',
        padding: 0.75,
        backgroundColor: '#f0f0e5',
        borderRadius: 2,
        mb: 1,
      }}
    >
      <Typography fontSize={14} variant="body1" fontWeight={500} className="highlight-text">
        {en.hignEndItem.text}
      </Typography>
      <InfoIcon
        sx={{
          fontSize: 18,
          cursor: 'pointer',
          position: 'absolute',
          top: -4,
          right: -10,
          borderRadius: 2,
        }}
        onClick={handleIconClick}
      />
      <MessageDialogBox
        isDialogOpen={openDialog}
        onClose={handleDialogClose}
        content={{
          title: en.hignEndItem.dialog.title,
          description: en.hignEndItem.dialog.description,
          isCrossIcon: true,
        }}
      />
    </Box>
  );
};

export default HighEndItemMessage;
