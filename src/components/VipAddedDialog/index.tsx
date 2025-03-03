'use client';
import React, { useState } from 'react';
import { Backdrop, Box, Button, CircularProgress, Typography } from '@mui/material';
import en from '@/helpers/lang';
import '../../app/(auth)/on-boarding/style.scss';
import './VipAddedDialog.scss';
import { useRouter, useSearchParams } from 'next/navigation';
import { paths } from '@/helpers/paths';

const VipAddedDialog = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isProfileEdit = searchParams.get('isProfileEdit');

  const handleAddAnotherVip = async () => {
    setLoading(true);
    try {
      window.location.reload();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleContinue = async () => {
    setLoading(true);
    try {
      router.push(isProfileEdit ? paths.root.profile.getHref() : paths.root.myVips.getHref());
      router.refresh();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Box className="bg-textBlack application__review onboarding__page" sx={{ maxHeight: '50vh' }}>
        <Box flexGrow={1} className="onboarding__page-inner">
          <Box className="onboarding__logo">
            <Typography variant="h1">{en.addedVipStatusScreen.thankyou}</Typography>
          </Box>
          <Box className="application__review-content">
            <Typography variant="h3">{en.addedVipStatusScreen.title}</Typography>
            <Typography variant="body1">{en.addedVipStatusScreen.vipAddedTitle}</Typography>
            <Typography variant="body1">{en.addedVipStatusScreen.addAnotherTitle}</Typography>
          </Box>
          <Box className="onboarding__page-links">
            <Button className="onboarding__link button button--white" onClick={handleAddAnotherVip}>
              {en.addedVipStatusScreen.addAnotherVIP}
            </Button>
            <Button className="onboarding__link button button--white" onClick={handleContinue}>
              {en.addedVipStatusScreen.continue}
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

export default VipAddedDialog;
