'use client';
import React from 'react';
import { UserRole } from '@/helpers/enums';
import { ProgressBarLink } from './ProgressBar';
import { useEditVipIdStore, useUserInfoStore } from '@/store/useStore';

const EditProfileBtn = () => {
  const { userRoleStore, vipIdStore } = useUserInfoStore();
  const { setVipId } = useEditVipIdStore();
  const handleClick = async (vipId: string | number) => {
    if (userRoleStore === UserRole.Agent) {
      setVipId(vipId.toString());
    }
  };
  const editProfileLink =
    userRoleStore === UserRole.Vip ? '/vip-profile-builder' : `/agent-profile-builder?edit=true&profile-route=true`;
  return (
    <ProgressBarLink href={editProfileLink} className="button button--link">
      <span
        style={{ textDecoration: 'underline', fontWeight: '400' }}
        onClick={() => {
          handleClick(vipIdStore);
        }}
      >
        Edit Profile
      </span>
    </ProgressBarLink>
  );
};

export default EditProfileBtn;
