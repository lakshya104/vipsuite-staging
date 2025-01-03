'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const RedirectIfEmpty: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/comingsoon');
  }, [router]);

  return null;
};

export default RedirectIfEmpty;
