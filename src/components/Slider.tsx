// components/OpportunitySlider.tsx
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

interface SliderProps {
  images: string[];
}

const ImageSlider: React.FC<SliderProps> = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  return (
    <Slider {...settings}>
      {images.map((src, index) => (
        <div key={index}>
          <Image src={src} alt={`Slide ${index + 1}`} layout="responsive" width={700} height={475} />
        </div>
      ))}
    </Slider>
  );
};

export default ImageSlider;
