'use client';
import React, { useState } from 'react';
import { Backdrop, Box, Button, CircularProgress, Typography } from '@mui/material';
import en from '@/helpers/lang';
import '../../app/(auth)/on-boarding/style.scss';
import './ApplicationReviewDialog.scss';
import { useRouter } from 'next/navigation';
import { paths } from '@/helpers/paths';

interface ApplicationReviewDialogProps {
  isBrand?: boolean;
}

const ApplicationReviewDialog: React.FC<ApplicationReviewDialogProps> = ({ isBrand = false }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleReviewDialogChange = () => {
    setLoading(true);
    try {
      router.push(paths.landing.getHref());
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
            <Typography variant="h1">
              {isBrand ? en.customBrandReviewScreen.thankyou : en.customReviewScreen.thankyou}
            </Typography>
          </Box>
          <Box className="application__review-content">
            <Typography variant="h3">
              {isBrand ? en.customBrandReviewScreen.inReview : en.customReviewScreen.inReview}
            </Typography>
            <Typography variant="body1">
              {isBrand ? en.customBrandReviewScreen.description : en.customReviewScreen.description}
            </Typography>
          </Box>
          <Box className="onboarding__page-links">
            <Button className="onboarding__link button button--white" onClick={handleReviewDialogChange}>
              {en.customReviewScreen.done}
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

export default ApplicationReviewDialog;
