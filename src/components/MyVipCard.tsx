'use client';
import React, { useState } from 'react';
import { Backdrop, Box, CircularProgress, IconButton, Typography } from '@mui/material';
import Image from 'next/image';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { createVipIdCookie, revalidateTag } from '@/libs/actions';
import { useRouter } from 'next/navigation';
import TAGS from '@/libs/apiTags';
import { useEditVipIdStore } from '@/store/useStore';
import { MessageDialogBox } from './Dialog/Dialog';
import { ProgressBarLink } from './ProgressBar';

interface MyVipCardProps {
  image: string;
  name: string;
  instaFollowers: number;
  tiktokFollowers: number;
  link: string;
  status: string;
  vipId: string;
}

const vipPendingBoxContent = {
  title: 'Vip Pending',
  subTitle: 'Your Vip Application is in Review',
  description:
    'Thank you for your application. The concierge team will review your submission and will be in touch in due course with their decision.',
  buttonText: 'Okay',
  isCrossIcon: false,
};

const MyVipCard: React.FC<MyVipCardProps> = ({ image, name, instaFollowers, link, tiktokFollowers, status, vipId }) => {
  const router = useRouter();
  const { setVipId } = useEditVipIdStore();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isVipPendingDialogOpen, setIsVipPendingDialogOpen] = useState<boolean>(false);
  const itemImage = image || '/img/placeholder-image.jpg';

  const handleClick = async (vipId: string) => {
    try {
      if (status === 'pending') {
        setIsVipPendingDialogOpen((prev) => !prev);
      } else {
        setLoading(true);
        try {
          await createVipIdCookie(vipId);
          await revalidateTag(TAGS.GET_DASHBOARD);
          router.push(link);
        } catch (error) {
          console.error('Error while selecting vipId:', error);
        }
      }
    } catch (error) {
      setLoading(false);
      console.error('Error in handleClick:', error);
    }
  };

  return (
    <Box
      onClick={() => {
        handleClick(vipId);
      }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px',
        borderBottom: '1px solid #e0e0e0',
        textDecoration: 'none',
        color: 'inherit',
        cursor: 'pointer',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Image
          src={itemImage}
          width={100}
          height={100}
          alt={name}
          style={{ width: 80, height: 80, marginRight: 2, borderRadius: '50px', margin: '0 20px 0 0' }}
        />
        <Box>
          <Typography variant="body1" sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
            {name}
          </Typography>
          {instaFollowers > 0 && (
            <Typography variant="body2" color="textSecondary">
              <Image
                src="/img/instagram.svg"
                width={10}
                height={10}
                alt={name}
                style={{ width: 18, height: 18, marginRight: 10 }}
              />
              {instaFollowers || 0}
            </Typography>
          )}
          {tiktokFollowers > 0 && (
            <Typography variant="body2" color="textSecondary">
              <Image
                src="/img/tiktok.svg"
                width={10}
                height={10}
                alt={name}
                style={{ width: 18, height: 18, marginRight: 10 }}
              />
              {tiktokFollowers || 0}
            </Typography>
          )}
          <Box sx={{ display: 'flex' }}>
            <Typography
              fontSize="12px"
              textAlign={'left'}
              sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}
              variant="body1"
            >
              Status: {status}
            </Typography>
            {status === 'pending' && (
              <ProgressBarLink href={`/agent-profile-builder?edit=true`}>
                <Typography
                  fontSize="12px"
                  sx={{ fontWeight: '500', textTransform: 'capitalize', textDecoration: 'underline', marginLeft: 1.5 }}
                  variant="body1"
                  onClick={(e) => {
                    e.stopPropagation();
                    setVipId(vipId);
                  }}
                >
                  ( Edit Profile )
                </Typography>
              </ProgressBarLink>
            )}
          </Box>
        </Box>
      </Box>
      <IconButton>
        <ArrowForwardIosIcon color="primary" />
      </IconButton>
      <Backdrop sx={{ color: 'black', zIndex: 100 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <MessageDialogBox
        isDialogOpen={isVipPendingDialogOpen}
        onClose={setIsVipPendingDialogOpen}
        content={vipPendingBoxContent}
      />
    </Box>
  );
};

export default MyVipCard;
