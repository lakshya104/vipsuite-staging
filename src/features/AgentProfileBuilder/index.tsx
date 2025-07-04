'use client';
import React, { useEffect, useState } from 'react';
import { ACF, ProfileBuilderData, UserProfile } from '@/interfaces';
import { useSearchParams } from 'next/navigation';
import { useEditVipIdStore } from '@/store/useStore';
import { GetEditVipProfile } from '@/libs/api-manager/manager';
import CustomLoader from '@/components/CustomLoader';
import DynamicProfileBuilderStepRenderer from '../DynamicProfileBuilderStepRenderer';

interface ProfileBuilderInterFace {
  token: string;
  profileBuilderData: ProfileBuilderData;
}

const AgentProfileBuilder: React.FC<ProfileBuilderInterFace> = ({ token, profileBuilderData }) => {
  const [profileDetail, setProfileDetail] = useState<ACF>({ first_name: '', last_name: '' });
  const searchParams = useSearchParams();
  const isEditVip = searchParams.get('edit');
  const { editVipId, shouldVipEdit } = useEditVipIdStore();
  const [id, setId] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const unsubHydrate = useEditVipIdStore.persist.onFinishHydration(() => {
      setIsHydrated(true);
    });

    // If already hydrated, set immediately
    if (useEditVipIdStore.persist.hasHydrated()) {
      setIsHydrated(true);
    }

    return () => unsubHydrate();
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    const initializeProfile = async () => {
      setIsLoading(true);
      if ((isEditVip || shouldVipEdit) && editVipId) {
        const numericId = Number(editVipId);
        setId(numericId);
        await fetchVipProfile(numericId);
      }
      setIsLoading(false);
    };

    initializeProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHydrated]);

  const fetchVipProfile = async (profileId: number) => {
    try {
      const response: UserProfile = await GetEditVipProfile(token, profileId);
      setProfileDetail(response.acf);
    } catch {
      setProfileDetail({ first_name: '', last_name: '' });
    }
  };
  if (!isHydrated || isLoading) {
    return <CustomLoader />;
  }

  return (
    <DynamicProfileBuilderStepRenderer
      id={id}
      profileBuilderSections={profileBuilderData}
      profileDetail={profileDetail}
      isAgent={true}
    />
  );
};

export default AgentProfileBuilder;
