import React from 'react';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Footer from '@/components/Footer';
import Header from '@/components/Header/Header';

export default async function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (session) redirect('/home');
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
