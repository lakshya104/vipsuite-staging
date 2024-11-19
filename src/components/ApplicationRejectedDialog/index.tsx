'use client';
import React, { useState } from 'react';
import { Backdrop, Box, Button, CircularProgress, Typography } from '@mui/material';
import en from '@/helpers/lang';
import '../../app/(auth)/on-boarding/style.scss';
import './ApplicationRejectedDialog.scss';
import { useRouter } from 'next/navigation';

const ApplicationRejectedDialog = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleReviewDialogChange = async () => {
    setLoading(true);
    try {
      await router.push('/');
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  return (
    <>
      <Box className="bg-textBlack application__review onboarding__page">
        <Box flexGrow={1} className="onboarding__page-inner">
          <Box className="onboarding__logo">
            <Typography variant="h1">{en.customRejectedScreen.rejectedTxt}</Typography>
          </Box>
          <Box className="application__review-content">
            <Typography variant="h3">{en.customRejectedScreen.subTitle}</Typography>
            <Typography variant="body1">{en.customRejectedScreen.rejectedPara}</Typography>
          </Box>
          <Box className="onboarding__page-links">
            <Button className="onboarding__link button button--white" onClick={handleReviewDialogChange}>
              {en.customRejectedScreen.continue}
            </Button>
          </Box>
        </Box>
      </Box>
      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default ApplicationRejectedDialog;
