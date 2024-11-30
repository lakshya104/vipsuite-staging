'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ArrowBackBtn = () => {
  const router = useRouter();
  return <ArrowBackIcon onClick={() => router.back()} sx={{ cursor: 'pointer' }} />;
};

export default ArrowBackBtn;
