'use client';
import React, { useState } from 'react';
import { Backdrop, CircularProgress, Dialog } from '@mui/material';
import { useRouter } from 'next/navigation';
import { createVipFollowersCookie, createVipIdCookie, revalidateTag } from '@/libs/actions';
import TAGS from '@/libs/apiTags';
import { useEditVipIdStore } from '@/store/useStore';
import { MessageDialogBox } from './Dialog';
import { ProfileStatus, UserRole } from '@/helpers/enums';
import { vipRejectedBoxContent } from '@/data';
import VipInfoBox from './VipInfoBox';
import { GetEditVipProfile } from '@/libs/api-manager/manager';
import { UserProfile } from '@/interfaces';
import { isEmpty } from 'lodash';
import ProfileReviewDialog from './ProfileReviewDialog';

interface MyVipCardProps {
  image: string;
  name: string;
  instaFollowers: string;
  tiktokFollowers: string;
  link: string;
  status: ProfileStatus;
  vipId: string;
  token: string;
}

const MyVipCard: React.FC<MyVipCardProps> = ({
  image,
  name,
  instaFollowers,
  link,
  tiktokFollowers,
  status,
  vipId,
  token,
}) => {
  const router = useRouter();
  const { setVipId } = useEditVipIdStore();
  const [isLoading, setLoading] = useState<boolean>(false);
  // const [isVipPendingDialogOpen, setIsVipPendingDialogOpen] = useState<boolean>(false);
  const [reviewDialogOpen, setReviewDialogOpen] = useState<boolean>(false);
  const [isVipRejectedDialogOpen, setIsVipRejectedDialogOpen] = useState<boolean>(false);
  const totalFollowerCount = Number(instaFollowers) + Number(tiktokFollowers);

  const handlePending = async () => {
    setLoading(true);
    try {
      const response: UserProfile = await GetEditVipProfile(token, Number(vipId));
      if (!response.acf.habits || isEmpty(response.acf.habits)) {
        try {
          setVipId(vipId);
          router.push('/agent-profile-builder?edit=true');
        } catch (error) {
          console.error('Error navigating to profile builder:', error);
          setLoading(false);
          throw error;
        }
      } else {
        setReviewDialogOpen(true);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error in handlePending:', error);
      setLoading(false);
    }
  };

  const handleClick = async () => {
    try {
      switch (status) {
        case ProfileStatus.Pending:
          handlePending();
          break;
        case ProfileStatus.Rejected:
          setIsVipRejectedDialogOpen((prev) => !prev);
          break;
        case ProfileStatus.Approved:
          setLoading(true);
          try {
            await createVipIdCookie(vipId);
            await createVipFollowersCookie(totalFollowerCount.toString());
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
      router.push('/agent-profile-builder?edit=true');
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
      {/* <MessageDialogBox
        isDialogOpen={isVipPendingDialogOpen}
        onClose={setIsVipPendingDialogOpen}
        content={vipPendingBoxContent}
      /> */}
      <MessageDialogBox
        isDialogOpen={isVipRejectedDialogOpen}
        onClose={setIsVipRejectedDialogOpen}
        content={vipRejectedBoxContent}
      />
      <Dialog open={reviewDialogOpen} fullScreen aria-labelledby="form-dialog-title">
        <ProfileReviewDialog role={UserRole.Agent} onClose={() => setReviewDialogOpen(false)} />
      </Dialog>
    </>
  );
};

export default MyVipCard;
