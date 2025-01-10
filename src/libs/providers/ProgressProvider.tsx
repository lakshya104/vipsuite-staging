'use client';
import React from 'react';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

type Props = { children: React.ReactNode; color: '#FFFFF7' | 'black' };

const ProgressProvider = ({ children, color }: Props) => {
  return (
    <>
      {children}
      <ProgressBar height="3px" color={color} options={{ showSpinner: false }} shallowRouting />
    </>
  );
};

export default ProgressProvider;
