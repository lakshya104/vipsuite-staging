'use client';
import React, { useEffect } from 'react';
import { useUserInfoStore } from '@/store/useStore';
import { UserRole } from '@/helpers/enums';

interface StoreUserDetailsProps {
  vipId: number | null;
  token: string;
  userRole: UserRole;
  userEmail: string;
}

const StoreUserDetails: React.FC<StoreUserDetailsProps> = ({ vipId, token, userRole, userEmail }) => {
  const { setVipIdStore, setTokenStore, setUserRoleStore, setUserEmailStore } = useUserInfoStore();

  useEffect(() => {
    setVipIdStore(vipId);
    setTokenStore(token);
    setUserRoleStore(userRole);
    setUserEmailStore(userEmail);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default StoreUserDetails;
