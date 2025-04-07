'use client';
import React, { useState } from 'react';
import { Backdrop, CircularProgress, Dialog } from '@mui/material';
import { useRouter } from 'next/navigation';
import { createIsAgentCookie, createVipIdCookie, revalidateTag } from '@/libs/actions';
import TAGS from '@/libs/apiTags';
import { MessageDialogBox } from './Dialog';
import { UserRole } from '@/helpers/enums';
import { vipRejectedBoxContent } from '@/data';
import VipInfoBox from './VipInfoBox';
import ProfileReviewDialog from './ProfileReviewDialog';
import en from '@/helpers/lang';

interface MyVipCardProps {
  image: string;
  name: string;
  instaFollowers: string;
  tiktokFollowers: string;
  link: string;
  vipId: string;
}

const MyVipCard: React.FC<MyVipCardProps> = ({ image, name, instaFollowers, link, tiktokFollowers, vipId }) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [reviewDialogOpen, setReviewDialogOpen] = useState<boolean>(false);
  const [isVipRejectedDialogOpen, setIsVipRejectedDialogOpen] = useState<boolean>(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await createIsAgentCookie('false');
      await createVipIdCookie(vipId);
      await revalidateTag(TAGS.GET_DASHBOARD);
      router.push(link);
    } catch (error) {
      console.error(en.myVipsPage.addError, error);
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
        handleClick={handleClick}
      />
      <Backdrop sx={{ color: 'black', zIndex: 100000 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
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
