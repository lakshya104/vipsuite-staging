'use client';
import React, { useEffect, useState } from 'react';
import { ACF, ProfileBuilderData } from '@/interfaces';
import { useSearchParams } from 'next/navigation';
import { GetEditProfile } from '@/libs/api-manager/manager';
import CustomLoader from '@/components/CustomLoader';
import DynamicProfileBuilderStepRenderer from '../DynamicProfileBuilderStepRenderer';

interface ProfileBuilderInterFace {
  token: string;
  profileBuilderData: ProfileBuilderData;
  incompleteVipId?: string | undefined;
}

const CompleteVipForm: React.FC<ProfileBuilderInterFace> = ({ token, profileBuilderData, incompleteVipId }) => {
  const [profileDetail, setProfileDetail] = useState<ACF>({ first_name: '', last_name: '' });
  const searchParams = useSearchParams();
  const isIncompleteEditVip = searchParams.get('editVip') === 'true';
  const [id, setId] = useState<number>(Number(incompleteVipId));
  const [isLoading, setIsLoading] = useState<boolean>(!!incompleteVipId);
  const [isEditing, setIsEditing] = useState<boolean>(!!isIncompleteEditVip);

  const fetchVipProfile = async (profileId: string) => {
    setIsLoading(true);
    try {
      const response = await GetEditProfile(profileId, token);
      setProfileDetail(response?.data?.acf);
      if (response?.data?.is_profile_completed === 1) {
        setIsEditing(true);
      }
    } catch {
      setProfileDetail({ first_name: '', last_name: '' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (incompleteVipId) {
      const initializeProfile = async () => {
        setId(Number(incompleteVipId));
        await fetchVipProfile(incompleteVipId);
      };
      initializeProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incompleteVipId]);

  if (isLoading) {
    return <CustomLoader />;
  }

  return (
    <DynamicProfileBuilderStepRenderer
      id={id}
      profileBuilderSections={profileBuilderData}
      profileDetail={profileDetail}
      isAgent={true}
      isIncompleteEditVip={isEditing}
      forIncompleteVip={true}
      token={token}
    />
  );
};

export default CompleteVipForm;
