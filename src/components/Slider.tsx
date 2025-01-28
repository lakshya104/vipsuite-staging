import React from 'react';
import Image from 'next/image';
import { Box, useMediaQuery } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { OpportunityDetails } from '@/interfaces/opportunitiesDetails';

interface SliderProps {
  images: string[];
  withLikeIcon?: boolean;
  item: OpportunityDetails;
}

const ImageSlider: React.FC<SliderProps> = ({ images }) => {
  const isMobile = useMediaQuery('(max-width:600px)');

  const settings = {
    dots: images.length > 1 && true,
    infinite: images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: !isMobile,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const SliderComponent = Slider as unknown as React.ComponentType<any>;

  return (
    <Box sx={{ position: 'relative', marginBottom: 4 }}>
      <SliderComponent {...settings}>
        {images.map((src, index) => (
          <Box
            key={index}
            sx={{
              position: 'relative',
              width: '100%',
              height: { xs: 256, md: 426 },
              overflow: 'hidden',
              borderRadius: 1,
            }}
          >
            <Image style={{ objectFit: 'cover' }} priority src={src} alt={`Slide ${index + 1}`} fill />
          </Box>
        ))}
      </SliderComponent>
    </Box>
  );
};

export default ImageSlider;
