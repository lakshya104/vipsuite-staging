'use client';
import React, { useTransition } from 'react';
import { UserRole } from '@/helpers/enums';
import { useEditVipIdStore } from '@/store/useStore';
import { Backdrop, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import en from '@/helpers/lang';
import { paths, withSearchParams } from '@/helpers/paths';

interface EditProfileBtnProps {
  vipId: number | undefined;
  role?: UserRole;
}
const EditProfileBtn: React.FC<EditProfileBtnProps> = ({ vipId, role }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { setVipId } = useEditVipIdStore();
  const editProfileLink =
    role === UserRole.Vip
      ? withSearchParams(() => paths.root.vipProfileBuilder.getHref(), { 'profile-route': 'true' })
      : withSearchParams(() => paths.root.agentProfileBuilder.getHref(), {
          'profile-route': 'true',
          edit: 'true',
        });

  const handleClick = () => {
    startTransition(() => {
      if (role === UserRole.Agent && vipId) {
        setVipId(vipId.toString());
      }
      router.push(editProfileLink);
    });
  };

  return (
    <>
      <span style={{ textDecoration: 'underline', fontWeight: '400', cursor: 'pointer' }} onClick={handleClick}>
        {en.profilePage.editBtn}
      </span>
      <Backdrop sx={{ color: '#fff', zIndex: 100000 }} open={isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default EditProfileBtn;
