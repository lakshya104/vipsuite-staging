'use client';
import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './TestimonialSection.scss';
import TestimonialCardFull from '../TestimonialFull';
import { ContentModule } from '@/interfaces/public-page';

interface TestimonialSectionFullProps {
  data: ContentModule;
}

const TestimonialSectionFull: React.FC<TestimonialSectionFullProps> = ({ data }) => {
  const hasMultipleItems = data?.list_items && data?.list_items.length > 1;
  const settings = {
    dots: false,
    infinite: hasMultipleItems,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: hasMultipleItems,
    autoplaySpeed: 3000,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const SliderComponent = Slider as unknown as React.ComponentType<any>;

  return (
    <Box component="section" className="testimonial-section testimonial-section--dark">
      <Container>
        <Typography variant="h2" textAlign="center" mb={4}>
          {data?.heading}
        </Typography>
        <SliderComponent {...settings}>
          {data?.list_items?.map((item, index) => (
            <Box key={index} px={1}>
              <TestimonialCardFull
                name={item.author?.name}
                title={item.author?.job_title}
                testimonial={item.testimonial_text}
                authorPhoto={item.author?.photo?.url}
              />
            </Box>
          ))}
        </SliderComponent>
      </Container>
    </Box>
  );
};

export default TestimonialSectionFull;
