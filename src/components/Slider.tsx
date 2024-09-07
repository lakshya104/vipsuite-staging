import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import { Box, styled, useTheme, useMediaQuery } from '@mui/material';

interface SliderProps {
  images: string[];
}

const StyledBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: 256,
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.up('md')]: {
    height: 384,
  },
}));

const StyledImage = styled(Image)({
  objectFit: 'cover',
});

const ImageSlider: React.FC<SliderProps> = ({ images }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: !isMobile,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
  };

  return (
    <Box sx={{ position: 'relative', marginBottom: 4 }}>
      <Slider {...settings}>
        {images.map((src, index) => (
          <StyledBox key={index}>
            <StyledImage src={src} alt={`Slide ${index + 1}`} fill />
          </StyledBox>
        ))}
      </Slider>
    </Box>
  );
};

export default ImageSlider;
