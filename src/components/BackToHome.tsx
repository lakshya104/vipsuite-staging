'use client';
import React from 'react';
import { Box, Button } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next-nprogress-bar';
import revalidatePathAction, { createSkipCookie } from '@/libs/actions';
import { useEditVipIdStore } from '@/store/useStore';
import { UserRole } from '@/helpers/enums';
import { paths } from '@/helpers/paths';

interface BackToHomeProps {
  role?: UserRole;
}

const BackToHome: React.FC<BackToHomeProps> = ({ role }) => {
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
    revalidatePathAction(paths.root.profile.getHref());
    if (role === UserRole.Vip || role === UserRole.Agent) {
      await createSkipCookie();
    }
    router.push(redirectPath);
    clearVipIdStore();
  };

  return (
    <Box className="profile-builder__close">
      <Button onClick={handleBack}>
        <span style={{ textDecoration: 'underline', textTransform: 'capitalize' }}>Skip</span>
      </Button>
    </Box>
  );
};

export default BackToHome;
