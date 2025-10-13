import React from 'react';
import Image from 'next/image';
import { Box, useMediaQuery } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { OpportunityDetails } from '@/interfaces/opportunitiesDetails';
import { DefaultImageFallback } from '@/helpers/enums';

interface SliderProps {
  item: OpportunityDetails;
}

const ImageSlider: React.FC<SliderProps> = ({ item }) => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const images =
    isMobile && item?.acf?.mobile_app_detail_images
      ? item?.acf?.mobile_app_detail_images?.map(
          (item) => item?.sizes['vs-container'] || DefaultImageFallback.LandscapePlaceholder,
        )
      : item?.acf?.web_detail_images &&
        item?.acf?.web_detail_images?.map(
          (item) => item?.sizes['vs-container'] || DefaultImageFallback.LandscapePlaceholder,
        );
  const sliderImages =
    images.length > 0
      ? images
      : [item?.acf?.featured_image?.sizes['vs-container'] || DefaultImageFallback.LandscapePlaceholder];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const SliderComponent = Slider as unknown as React.ComponentType<any>;
  const settings = {
    dots: images.length > 1 && true,
    infinite: images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
  };

  return (
    <Box sx={{ position: 'relative', mb: 4 }}>
      <SliderComponent {...settings}>
        {sliderImages.map((src, index) =>
          isMobile ? (
            <Box
              key={index}
              sx={{
                position: 'relative',
                width: '100%',
                overflow: 'hidden',
                borderRadius: 1,
              }}
            >
              <Image
                priority
                src={src}
                alt={`Slide ${index + 1}`}
                width={600}
                height={400}
                quality={75}
                style={{ minHeight: '372px', height: 'auto', objectFit: 'cover' }}
                placeholder="blur"
                blurDataURL={DefaultImageFallback.LandscapePlaceholder}
              />
            </Box>
          ) : (
            <Box
              key={index}
              sx={{
                position: 'relative',
                width: '100%',
                minHeight: { xs: 256, md: 426 },
                overflow: 'hidden',
                borderRadius: 1,
              }}
            >
              <Image
                priority
                src={src}
                alt={`Slide ${index + 1}`}
                fill
                quality={75}
                placeholder="blur"
                blurDataURL={DefaultImageFallback.LandscapePlaceholder}
                style={{ objectFit: 'cover' }}
              />
            </Box>
          ),
        )}
      </SliderComponent>
    </Box>
  );
};

export default ImageSlider;
