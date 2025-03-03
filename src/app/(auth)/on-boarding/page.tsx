import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import './style.scss';
import en from '@/helpers/lang';
import { paths } from '@/helpers/paths';

const Onboarding = () => {
  return (
    <Box className="onboarding__page">
      <Box flexGrow={1} className="onboarding__page-inner">
        <Box className="onboarding__logo">
          <Image alt="VipLogo" src="/VIPSLogo.png" width={300} height={60} style={{ objectFit: 'contain' }} priority />
        </Box>
        <Typography variant="h2">{en.onBoarding.applyAs}</Typography>
        <Box className="onboarding__page-links">
          <Link href={paths.auth.signup.vip.getHref()} className="onboarding__link" passHref>
            {en.onBoarding.vip}
          </Link>
          <Link href={paths.auth.signup.agent.getHref()} className="onboarding__link" passHref>
            {en.onBoarding.agency}
          </Link>
          <Link href={paths.auth.signup.brand.getHref()} className="onboarding__link" passHref>
            {en.onBoarding.brand}
          </Link>
        </Box>
      </Box>
      <Typography sx={{ fontSize: '0.8rem', my: 3 }} className="onboarding__text">
        {en.helperText.alreadyAccount}{' '}
        <Link
          href={paths.auth.login.getHref()}
          style={{
            textDecoration: 'underline',
            padding: 0,
            margin: 0,
            color: 'white',
          }}
        >
          {en.helperText.loginHere}
        </Link>
      </Typography>
    </Box>
  );
};

export default Onboarding;
