/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Box, styled } from '@mui/material';
import React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { AddToWishlist, DeleteFromWishlist } from '@/libs/api-manager/manager';
import UseToaster from '@/hooks/useToaster';
import Toaster from './Toaster';

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
}
const FeedLikeIcon: React.FC<FeedLikeIconProps> = ({ isWishlisted, postId }) => {
  const [liked, setLiked] = React.useState(isWishlisted ? true : false);
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const user = useCurrentUser();
  const token = user.token;
  const vipId = user.vip_profile_id;
  const handleIconClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const handleLike = async (event: any) => {
    event.stopPropagation();
    handleIconClick(event);
    setLiked((prevLiked) => !prevLiked);
    try {
      if (!isWishlisted) {
        await AddToWishlist(token, vipId, postId);
      } else {
        await DeleteFromWishlist(token, vipId, postId);
      }
    } catch (error) {
      openToaster(error?.toString() ?? 'Error updating wishlist');
      setLiked((prevLiked) => !prevLiked);
    }
  };

  return (
    <>
      <AnimatedBox onClick={handleLike}>
        <IconWrapper>
          <AnimatedIcon
            style={{
              opacity: liked ? 0 : 1,
              transform: liked ? 'scale(0.5)' : 'scale(1)',
            }}
          >
            <FavoriteBorderIcon sx={{ color: 'white' }} />
          </AnimatedIcon>
          <AnimatedIcon
            style={{
              opacity: liked ? 1 : 0,
              transform: liked ? 'scale(1)' : 'scale(1.5)',
            }}
          >
            <FavoriteIcon sx={{ color: '#FFFFF7' }} />
          </AnimatedIcon>
        </IconWrapper>
      </AnimatedBox>
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity="error" />
    </>
  );
};

export default FeedLikeIcon;
