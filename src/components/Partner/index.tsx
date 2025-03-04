'use client';
import * as React from 'react';
import { Box } from '@mui/material';
import Slider, { Settings } from 'react-slick';
import Image from 'next/image';
import './Partner.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ContentModule } from '@/interfaces/public-page';
import { DefaultImageFallback } from '@/helpers/enums';
import en from '@/helpers/lang';

interface PartnerProps {
  data: ContentModule;
}

const Partner: React.FC<PartnerProps> = ({ data }) => {
  const logos = data?.list_items;

  const settings: Settings = {
    dots: false,
    variableWidth: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const SliderComponent = Slider as unknown as React.ComponentType<any>;

  return (
    logos && (
      <Box component="section" className="site-partner">
        <Box>
          <SliderComponent {...settings}>
            {logos?.map((item, index) => (
              <Box key={index} className="site-partner__card">
                <Box className="site-partner__card-inner">
                  <Image
                    src={item?.logo?.sizes?.['thumbnail'] || DefaultImageFallback.Placeholder}
                    alt={item?.logo?.title || en.landingPage.partners.logos}
                    fill
                  />
                </Box>
              </Box>
            ))}
            {logos?.map((item, index) => (
              <Box key={index} className="site-partner__card">
                <Box className="site-partner__card-inner">
                  <Image
                    src={item?.logo?.sizes?.['thumbnail'] || DefaultImageFallback.Placeholder}
                    alt={item?.logo?.title || en.landingPage.partners.logos}
                    fill
                  />
                </Box>
              </Box>
            ))}
          </SliderComponent>
        </Box>
      </Box>
    )
  );
};

export default Partner;
