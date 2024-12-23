'use client';
import React, { useState } from 'react';
import { Backdrop, Box, Button, CircularProgress, Typography } from '@mui/material';
import { LogOut } from '@/libs/api-manager/manager';
import { signOut } from 'next-auth/react';
import en from '@/helpers/lang';
import '../../app/(auth)/on-boarding/style.scss';
import './ProfileReviewDialog.scss';
import { UserRole } from '@/helpers/enums';

interface ProfileReviewDialogProps {
  role: UserRole;
  onClose?: () => void;
  token?: string;
}

const ProfileReviewDialog: React.FC<ProfileReviewDialogProps> = ({ role, onClose, token }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleReviewDialogChange = async () => {
    setLoading(true);
    try {
      if (role === UserRole.Vip && token) {
        await LogOut(token);
        signOut({ callbackUrl: '/', redirect: true });
      } else {
        if (onClose) onClose();
      }
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
            <Typography variant="h1">{en.customProfileInReviewScreen.thankyou}</Typography>
          </Box>
          <Box className="application__review-content">
            <Typography variant="h3">{en.customProfileInReviewScreen.inReview}</Typography>
            <Typography variant="body1">{en.customProfileInReviewScreen.inReviewPara}</Typography>
            <Typography variant="body1">{en.customProfileInReviewScreen.inReviewSubPara}</Typography>
          </Box>
          <Box className="onboarding__page-links">
            <Button className="onboarding__link button button--white" onClick={handleReviewDialogChange}>
              {en.customProfileInReviewScreen.done}
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

export default ProfileReviewDialog;
