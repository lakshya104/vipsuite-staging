import React from 'react';
import ProgressProvider from '@/libs/providers/ProgressProvider';

export default async function AgentSectionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProgressProvider color="black"> {children}</ProgressProvider>;
}
