'use client';
import React, { useState } from 'react';
import { Backdrop, CircularProgress, Dialog } from '@mui/material';
import { MessageDialogBox } from './Dialog';
import { UserRole } from '@/helpers/enums';
import { vipRejectedBoxContent } from '@/data';
import VipInfoBox from './VipInfoBox';
import ProfileReviewDialog from './ProfileReviewDialog';

interface MyVipCardProps {
  image: string;
  name: string;
  instaFollowers: string;
  tiktokFollowers: string;
  link: string;
  vipId: string;
  is_referenced?: boolean;
  isIncomplete?: boolean;
  onDelete?: () => void;
  isDeleting?: boolean;
  profileCompletionUrl?: string;
}

const MyVipCard: React.FC<MyVipCardProps> = ({
  image,
  name,
  instaFollowers,
  tiktokFollowers,
  is_referenced,
  isIncomplete,
  onDelete,
  isDeleting,
  profileCompletionUrl,
}) => {
  // const router = useRouter();
  // const [isLoading, setLoading] = useState<boolean>(false);
  const [reviewDialogOpen, setReviewDialogOpen] = useState<boolean>(false);
  const [isVipRejectedDialogOpen, setIsVipRejectedDialogOpen] = useState<boolean>(false);
  // const { setVipId } = useEditVipIdStore();

  // const handleClick = async () => {
  //   try {
  //     if (!is_referenced) {
  //       setLoading(true);
  //       setVipId(vipId);
  //       router.push(link);
  //     }
  //   } catch (error) {
  //     console.error(en.myVipsPage.addError, error);
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      <VipInfoBox
        image={image}
        name={name}
        instaFollowers={instaFollowers}
        tiktokFollowers={tiktokFollowers}
        onDelete={onDelete}
        is_referenced={is_referenced}
        isIncomplete={isIncomplete}
        profileCompletionUrl={profileCompletionUrl}
      />
      <Backdrop sx={{ color: 'black', zIndex: 100000 }} open={Boolean(isDeleting)}>
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
