'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { paths } from '@/helpers/paths';

const RedirectIfEmpty: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(paths.comingSoon.getHref());
  }, [router]);

  return null;
};

export default RedirectIfEmpty;
