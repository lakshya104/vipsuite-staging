'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Backdrop, Box, Button, CircularProgress, Typography } from '@mui/material';
import Image from 'next/image';
import en from '@/helpers/lang';
import './ApplicationAcceptedDialog.scss';
import '../../app/(auth)/on-boarding/style.scss';
import { UserRole } from '@/helpers/enums';
import { paths } from '@/helpers/paths';
import { createSkipCookie } from '@/libs/actions';

interface ApplicationAcceptedDialogProps {
  name: string;
  role: UserRole;
  brandName: string;
}

const ApplicationAcceptedDialog: React.FC<ApplicationAcceptedDialogProps> = ({ name, role, brandName }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleAcceptDialogChange = async () => {
    setLoading(true);
    try {
      await createSkipCookie();
      if (role === UserRole.Vip) {
        await router.push(paths.root.vipProfileBuilder.getHref());
      } else if (role === UserRole.Brand) {
        await router.push(paths.root.home.getHref());
      } else if (role === UserRole.Agent) {
        await router.push(paths.root.home.getHref());
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  return (
    <>
      <Box className="bg-textBlack application__status onboarding__page">
        <Box flexGrow={1} className="onboarding__page-inner">
          <Box className="onboarding__logo">
            <Typography variant="h1">
              {role === UserRole.Brand ? en.customBrandAcceptedScreen.acceptedTxt : en.customAcceptedScreen.acceptedTxt}
            </Typography>
          </Box>
          <Box className="application__status-content">
            <Image
              alt="Application Approved"
              src="/img/application-status.png"
              width={199}
              height={199}
              sizes="(max-width: 300px) 100vw, 300px"
              style={{ objectFit: 'contain' }}
              priority
            />
            <Typography variant="h3">
              {role === UserRole.Brand ? en.customBrandAcceptedScreen.welcomeTxt : en.customAcceptedScreen.welcomeTxt},{' '}
              {role === UserRole.Brand && brandName ? brandName : name}
            </Typography>
            <Typography variant="body1">
              {role === UserRole.Brand
                ? en.customBrandAcceptedScreen.welcomePara
                : role === UserRole.Agent
                  ? en.customAcceptedScreen.agentWelcomePara
                  : en.customAcceptedScreen.welcomePara}
            </Typography>
          </Box>
          <Box className="onboarding__page-links">
            <Button className="onboarding__link button button--white" onClick={handleAcceptDialogChange}>
              {en.customAcceptedScreen.continue}
            </Button>
          </Box>
        </Box>
      </Box>
      <Backdrop sx={{ color: 'white', zIndex: 100 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default ApplicationAcceptedDialog;
