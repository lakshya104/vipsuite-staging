'use client';
import React, { useState } from 'react';
// import { ProgressBarLink } from './ProgressBar';
import { Backdrop, Box, CircularProgress, IconButton, Typography } from '@mui/material';
import Image from 'next/image';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import revalidatePathAction, { createVipIdCookie, revalidateTag } from '@/libs/actions';
import { useRouter } from 'next/navigation';
import TAGS from '@/libs/apiTags';

interface MyVipCardProps {
  image: string;
  name: string;
  instaFollowers: string;
  tiktokFollowers: string;
  link: string;
  status: string;
  vipId: string;
}

const MyVipCard: React.FC<MyVipCardProps> = ({ image, name, instaFollowers, link, tiktokFollowers, status, vipId }) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(false);
  const itemImage = image || '/img/placeholder-image.jpg';
  const handleClick = async (vipId: string) => {
    setLoading(true);
    try {
      if (status === 'pending') {
        router.push(link);
      } else {
        try {
          await createVipIdCookie(vipId);
          await revalidateTag(TAGS.GET_DASHBOARD);
          await revalidatePathAction(`/agent-home`);
          router.push(link);
        } catch (error) {
          console.error('Error in handleClick:', error);
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
          <Typography variant="body2" color="textSecondary">
            <Image
              src="/img/instagram.svg"
              width={10}
              height={10}
              alt={name}
              style={{ width: 18, height: 18, marginRight: 10 }}
            />
            {instaFollowers}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <Image
              src="/img/tiktok.svg"
              width={10}
              height={10}
              alt={name}
              style={{ width: 18, height: 18, marginRight: 10 }}
            />
            {tiktokFollowers}
          </Typography>
          <Typography
            fontSize="12px"
            textAlign={'left'}
            sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}
            variant="body1"
          >
            Status: {status}
          </Typography>
        </Box>
      </Box>
      {/* <ProgressBarLink href={link}> */}
      <IconButton>
        <ArrowForwardIosIcon color="primary" />
      </IconButton>
      {/* </ProgressBarLink> */}
      <Backdrop sx={{ color: 'black', zIndex: 100 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default MyVipCard;
