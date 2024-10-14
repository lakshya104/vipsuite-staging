'use client';
import React from 'react';
import { UserRole } from '@/helpers/enums';
import { ProgressBarLink } from './ProgressBar';
import { useEditVipIdStore } from '@/store/useStore';

interface EditProfileBtnProps {
  role: UserRole;
  vipId: string | number;
}
const EditProfileBtn: React.FC<EditProfileBtnProps> = ({ role, vipId }) => {
  const { setVipId } = useEditVipIdStore();
  const handleClick = async (vipId: string | number) => {
    if (role === UserRole.Agent) {
      setVipId(vipId.toString());
    }
  };
  const editProfileLink =
    role === UserRole.Vip ? '/vip-profile-builder' : `/agent-profile-builder?edit=true&profile-route=true`;
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
