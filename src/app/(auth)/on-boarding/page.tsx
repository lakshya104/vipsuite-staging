import React from 'react';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import './style.scss';
import Image from 'next/image';

const Onboarding = () => {
  return (
    <Box className="onboarding__page">
      <Box flexGrow={1} className="onboarding__page-inner">
        <Box className="onboarding__logo">
          <Image alt="VipLogo" src="/VIPSLogo.png" width={300} height={60} style={{ objectFit: 'contain' }} priority />
        </Box>
        <Typography variant="h2">Apply as</Typography>
        <Box className="onboarding__page-links">
          <Link href="/signup/vip" className="onboarding__link" passHref>
            VIP
          </Link>
          <Link href="/signup/agent" className="onboarding__link" passHref>
            Agent
          </Link>
          <Link href="/signup/brand" className="onboarding__link" passHref>
            Brand
          </Link>
        </Box>
      </Box>
      <Typography sx={{ fontSize: '0.8rem', my: 3 }} className="onboarding__text">
        Already have an account?{' '}
        <Link
          href={'/login'}
          style={{
            textDecoration: 'underline',
            padding: 0,
            margin: 0,
            color: 'white',
          }}
        >
          Login here
        </Link>
      </Typography>
    </Box>
  );
};

export default Onboarding;
