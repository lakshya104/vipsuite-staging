'use client';
import React, { useTransition } from 'react';
import { Backdrop, Box, Button, CircularProgress } from '@mui/material';
import revalidatePathAction from '@/libs/actions';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEditVipIdStore } from '@/store/useStore';
import { UserRole } from '@/helpers/enums';

interface BackToHomeProps {
  role?: UserRole;
}

const BackToHome: React.FC<BackToHomeProps> = ({ role }) => {
  const [isPending, startTransition] = useTransition();
  const { clearVipId } = useEditVipIdStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isProfileEdit = searchParams.get('profile-route');
  const isApplicationAcceptedShown = searchParams.get('accepted');

  const redirectPath =
    isProfileEdit || role === UserRole.Vip
      ? '/profile'
      : isApplicationAcceptedShown
        ? '/my-vips?accepted=true'
        : '/my-vips';

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
        <span style={{ textDecoration: 'underline', textTransform: 'capitalize' }}>Skip</span>
      </Button>
      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default BackToHome;
