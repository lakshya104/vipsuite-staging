'use client';
import React, { useTransition } from 'react';
import { Backdrop, Box, Button, CircularProgress } from '@mui/material';
import revalidatePathAction from '@/libs/actions';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEditVipIdStore } from '@/store/useStore';
import Image from 'next/image';
import { UserRole } from '@/helpers/enums';

interface BackToHomeProps {
  role?: string;
}
const BackToHome: React.FC<BackToHomeProps> = ({ role }) => {
  const [isPending, startTransition] = useTransition();
  const { clearVipId } = useEditVipIdStore();
  const searchParams = useSearchParams();
  const isProfileEdit = searchParams.get('profile-route');
  const redirectPath = isProfileEdit || role === UserRole.Vip ? '/profile' : '/my-vips';
  const router = useRouter();
  const handleBack = () => {
    startTransition(() => {
      revalidatePathAction('/profile');
      router.push(redirectPath);
      clearVipId();
    });
  };
  return (
    <Box className="profile-builder__close">
      <Button onClick={handleBack}>
        <Image src="/img/Close.svg" alt="Cross Icon" height={25} width={122} priority />
      </Button>
      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default BackToHome;
