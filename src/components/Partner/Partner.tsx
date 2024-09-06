'use client';
import * as React from 'react';
import { Typography, Box } from '@mui/material';
import Slider from 'react-slick';
import { partners } from '@/data';
import Image from 'next/image';
import './Partner.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Partner = () => {
  const settings = {
    dots: false,
    variableWidth: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
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
    <Box component="section" className="site-partner">
      <Typography component="h2" variant="h2">
        Proudly Partnered with...
      </Typography>
      <Box>
        <Slider {...settings}>
          {partners.map((partner, index) => (
            <Box key={index} className="site-partner__card">
              <Box className="site-partner__card-inner">
                <Image src={partner.img} alt={partner.title} fill />
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default Partner;
