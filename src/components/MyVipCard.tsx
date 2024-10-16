'use client';
import React, { useState } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import { createVipIdCookie, revalidateTag } from '@/libs/actions';
import TAGS from '@/libs/apiTags';
import { useEditVipIdStore } from '@/store/useStore';
import { MessageDialogBox } from './Dialog';
import { ProfileStatus } from '@/helpers/enums';
import { vipPendingBoxContent, vipRejectedBoxContent } from '@/data';
import VipInfoBox from './VipInfoBox';

interface MyVipCardProps {
  image: string;
  name: string;
  instaFollowers: number;
  tiktokFollowers: number;
  link: string;
  status: ProfileStatus;
  vipId: string;
}

const MyVipCard: React.FC<MyVipCardProps> = ({ image, name, instaFollowers, link, tiktokFollowers, status, vipId }) => {
  const router = useRouter();
  const { setVipId } = useEditVipIdStore();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isVipPendingDialogOpen, setIsVipPendingDialogOpen] = useState<boolean>(false);
  const [isVipRejectedDialogOpen, setIsVipRejectedDialogOpen] = useState<boolean>(false);

  const handleClick = async () => {
    try {
      switch (status) {
        case ProfileStatus.Pending:
          setIsVipPendingDialogOpen((prev) => !prev);
          break;
        case ProfileStatus.Rejected:
          setIsVipRejectedDialogOpen((prev) => !prev);
          break;
        case ProfileStatus.Approved:
          setLoading(true);
          try {
            await createVipIdCookie(vipId);
            await revalidateTag(TAGS.GET_DASHBOARD);
            router.push(link);
          } catch (error) {
            console.error('Error while selecting vipId:', error);
            setLoading(false);
          }
          break;
        default:
          console.warn('Unhandled status:', status);
          break;
      }
    } catch (error) {
      console.error('Error in handleClick:', error);
      setLoading(false);
    }
  };

  const handleEditProfile = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setLoading(true);
    try {
      setVipId(vipId);
      await router.push('/agent-profile-builder?edit=true');
    } catch (error) {
      console.error('Error in handleEditProfile:', error);
      setLoading(false);
    }
  };

  return (
    <>
      <VipInfoBox
        image={image}
        name={name}
        instaFollowers={instaFollowers}
        tiktokFollowers={tiktokFollowers}
        status={status}
        handleClick={handleClick}
        handleEditProfile={handleEditProfile}
      />
      <Backdrop sx={{ color: 'black', zIndex: 100 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <MessageDialogBox
        isDialogOpen={isVipPendingDialogOpen}
        onClose={setIsVipPendingDialogOpen}
        content={vipPendingBoxContent}
      />
      <MessageDialogBox
        isDialogOpen={isVipRejectedDialogOpen}
        onClose={setIsVipRejectedDialogOpen}
        content={vipRejectedBoxContent}
      />
    </>
  );
};

export default MyVipCard;
