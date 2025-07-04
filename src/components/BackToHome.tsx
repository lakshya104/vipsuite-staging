'use client';
import React, { useTransition } from 'react';
import { Backdrop, Box, Button, CircularProgress } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import revalidatePathAction, { createSkipCookie } from '@/libs/actions';
import { useEditVipIdStore } from '@/store/useStore';
import { UserRole } from '@/helpers/enums';
import { paths } from '@/helpers/paths';

interface BackToHomeProps {
  role?: UserRole;
}

const BackToHome: React.FC<BackToHomeProps> = ({ role }) => {
  const [isPending, startTransition] = useTransition();
  const { clearVipIdStore } = useEditVipIdStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isProfileEdit = searchParams.get('profile-route');

  const redirectPath =
    role === UserRole.Vip && !isProfileEdit
      ? paths.root.home.getHref()
      : isProfileEdit
        ? paths.root.profile.getHref()
        : paths.root.myVips.getHref();

  const handleBack = async () => {
    startTransition(async () => {
      revalidatePathAction(paths.root.profile.getHref());
      if (role === UserRole.Vip || role === UserRole.Agent) {
        await createSkipCookie();
      }
      router.push(redirectPath);
      clearVipIdStore();
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
