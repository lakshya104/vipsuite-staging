import Footer from '@/components/Footer';
import Header from '@/components/Header/Header';
import React from 'react';

export default async function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
