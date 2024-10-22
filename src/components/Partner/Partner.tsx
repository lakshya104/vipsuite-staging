'use client';
import * as React from 'react';
import { Typography, Box } from '@mui/material';
import Slider from 'react-slick';
import Image from 'next/image';
import './Partner.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ContentModule } from '@/interfaces/public-page';

interface PartnerProps {
  data: ContentModule;
}

const Partner: React.FC<PartnerProps> = ({ data }) => {
  const logos = data?.list_items;

  const settings = {
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

  return (
    data && (
      <Box component="section" className="site-partner">
        <Typography component="h2" variant="h2">
          {data?.heading}
        </Typography>
        <Box>
          <Slider {...settings}>
            {logos?.map((item, index) => (
              <Box key={index} className="site-partner__card">
                <Box className="site-partner__card-inner">
                  <Image src={item?.logo?.sizes?.['thumbnail'] ?? ''} alt={item?.logo?.title ?? 'Partner Logo'} fill />
                </Box>
              </Box>
            ))}
            {logos?.map((item, index) => (
              <Box key={index} className="site-partner__card">
                <Box className="site-partner__card-inner">
                  <Image src={item?.logo?.sizes?.['thumbnail'] ?? ''} alt={item?.logo?.title ?? 'Partner Logo'} fill />
                </Box>
              </Box>
            ))}
          </Slider>
        </Box>
      </Box>
    )
  );
};

export default Partner;
