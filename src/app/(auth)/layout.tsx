import React from 'react';
import { Box } from '@mui/material';
import '@/styles/globals.scss';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (session) redirect('/home');
  return <Box className="bg-textBlack">{children}</Box>;
}
