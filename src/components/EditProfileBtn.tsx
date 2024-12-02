'use client';
import React from 'react';
import { UserRole } from '@/helpers/enums';
import { ProgressBarLink } from './ProgressBar';
import { useEditVipIdStore } from '@/store/useStore';

interface EditProfileBtnProps {
  vipId: number | undefined;
  role?: UserRole;
}
const EditProfileBtn: React.FC<EditProfileBtnProps> = ({ vipId, role }) => {
  const { setVipId } = useEditVipIdStore();
  const handleClick = async (vipId: undefined | number) => {
    if (role === UserRole.Agent && vipId) {
      setVipId(vipId.toString());
    }
  };
  const editProfileLink =
    role === UserRole.Vip
      ? '/vip-profile-builder?profile-route=true'
      : `/agent-profile-builder?edit=true&profile-route=true`;
  return (
    <ProgressBarLink href={editProfileLink} className="button button--link">
      <span
        style={{ textDecoration: 'underline', fontWeight: '400' }}
        onClick={() => {
          handleClick(vipId);
        }}
      >
        Edit Profile
      </span>
    </ProgressBarLink>
  );
};

export default EditProfileBtn;
