'use client';
import { Box, styled } from '@mui/material';
import React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const AnimatedBox = styled(Box)({
  position: 'absolute',
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

const FeedLikeIcon = () => {
  const [liked, setLiked] = React.useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
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
  );
};

export default FeedLikeIcon;
