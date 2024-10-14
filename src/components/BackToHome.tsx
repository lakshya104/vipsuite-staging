'use client';
import React, { useTransition } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Backdrop, Box, Button, CircularProgress } from '@mui/material';
import revalidatePathAction from '@/libs/actions';
import { useRouter } from 'next/navigation';
import { useEditVipIdStore } from '@/store/useStore';

interface BackToHomeProps {
  path?: string;
}

const BackToHome: React.FC<BackToHomeProps> = ({ path }) => {
  const [isPending, startTransition] = useTransition();
  const { clearVipId } = useEditVipIdStore();
  const redirectPath = path ? path : '/profile';
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
        <CloseIcon />
      </Button>
      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default BackToHome;
