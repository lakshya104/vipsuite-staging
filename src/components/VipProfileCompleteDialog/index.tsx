'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';
import en from '@/helpers/lang';
import '../../app/(auth)/on-boarding/style.scss';
import './VipProfileCompleteDialog.scss';

const VipProfileCompleteDialog = () => {
  return (
    <Box className="bg-textBlack application__review onboarding__page" sx={{ maxHeight: '50vh' }}>
      <Box className="onboarding__page-inner">
        <Box className="onboarding__logo">
          <Typography variant="h1">{en.vipProfileCompleteScreen.congratulations}</Typography>
        </Box>
        <Box className="application__review-content">
          <Typography variant="body2">{en.vipProfileCompleteScreen.profileComplete}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default VipProfileCompleteDialog;
