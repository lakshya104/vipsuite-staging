/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Box, styled } from '@mui/material';
import React, { useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { AddToWishlist, DeleteFromWishlist } from '@/libs/api-manager/manager';
import UseToaster from '@/hooks/useToaster';
import Toaster from './Toaster';
import { revalidateTag } from '@/libs/actions';
import TAGS from '@/libs/apiTags';
import en from '@/helpers/lang';

const AnimatedBox = styled(Box)({
  position: 'absolute',
  zIndex: 9,
  top: 8,
  right: 8,
  cursor: 'pointer',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.2)',
  },
});

const IconWrapper = styled('div')({
  position: 'relative',
  width: 24,
  height: 24,
});

const AnimatedIcon = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
});
interface FeedLikeIconProps {
  isWishlisted?: boolean;
  postId: number;
  type: string;
}
const FeedLikeIcon: React.FC<FeedLikeIconProps> = ({ isWishlisted, postId, type }) => {
  const [isWislist, setIsWishlist] = useState(isWishlisted ?? isWishlisted);
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const [toasterType, setToasterType] = useState<string>('');

  const handleIconClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const revalidateTags = async (postType: string) => {
    switch (postType) {
      case 'event':
        await revalidateTag(TAGS.GET_EVENTS);
        await revalidateTag(TAGS.GET_EVENT_DETAILS);
        break;
      case 'brand':
        await revalidateTag(TAGS.GET_BRANDS);
        await revalidateTag(TAGS.GET_BRAND_DETAILS);
        break;
      case 'brand-profile':
        await revalidateTag(TAGS.GET_BRANDS);
        await revalidateTag(TAGS.GET_BRAND_DETAILS);
        break;
      case 'opportunity':
        await revalidateTag(TAGS.GET_OPPORTUNITY);
        await revalidateTag(TAGS.GET_OPPORTUNITY_DETAILS);
        break;
      default:
        break;
    }
  };

  const handleLike = async (event: any) => {
    setToasterType('');
    event.stopPropagation();
    handleIconClick(event);
    setIsWishlist((prevLiked) => !prevLiked);
    try {
      if (!isWislist) {
        setToasterType('success');
        openToaster(en.feedIcon.addItem);
        setIsWishlist(true);
        await AddToWishlist(postId);
      } else {
        setToasterType('info');
        openToaster(en.feedIcon.deleteItem);
        setIsWishlist(false);
        await DeleteFromWishlist(postId);
      }
    } catch (error) {
      setToasterType('error');
      openToaster(error?.toString() ?? en.feedIcon.updateError);
      setIsWishlist((prevLiked) => !prevLiked);
    } finally {
      await revalidateTags(type);
    }
  };

  return (
    <>
      <AnimatedBox onClick={handleLike}>
        <IconWrapper>
          <AnimatedIcon
            style={{
              opacity: isWislist ? 0 : 1,
              transform: isWislist ? 'scale(0.5)' : 'scale(1)',
            }}
          >
            <FavoriteBorderIcon sx={{ color: 'white' }} />
          </AnimatedIcon>
          <AnimatedIcon
            style={{
              opacity: isWislist ? 1 : 0,
              transform: isWislist ? 'scale(1)' : 'scale(1.5)',
            }}
          >
            <FavoriteIcon sx={{ color: '#FFFFF7' }} />
          </AnimatedIcon>
        </IconWrapper>
      </AnimatedBox>
      <Toaster
        open={toasterOpen}
        setOpen={closeToaster}
        message={error}
        severity={toasterType as 'error' | 'warning' | 'info' | 'success'}
      />
    </>
  );
};

export default FeedLikeIcon;
