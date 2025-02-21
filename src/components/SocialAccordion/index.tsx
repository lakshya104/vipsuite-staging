'use client';
import React, { Fragment, useState, useEffect } from 'react';
import Image from 'next/image';
import { Box, Button, Container, Typography } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SocialAccordion.scss';
import { ContentModule } from '@/interfaces/public-page';
import en from '@/helpers/lang';

interface SocialAccordionProps {
  data: ContentModule;
}

const SocialAccordion: React.FC<SocialAccordionProps> = ({ data }) => {
  const socialLinks = data?.slides;

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const SliderComponent = Slider as unknown as React.ComponentType<any>;
  return (
    <Box component="section" className="site-card">
      <Container>
        <Box className="site-card__wrapper">
          {isMobile ? (
            <Box className="accordionItem">
              <SliderComponent {...sliderSettings}>
                {socialLinks?.map((link, index) => (
                  <Box key={index} className="accordionItem__link">
                    <Box className="accordionItem__image">
                      <Image src={link?.image?.sizes?.['vs-container']} alt={link?.heading} width={1024} height={430} />
                    </Box>
                    <Box className="accordionItem__full">
                      <Typography variant="h2">{link?.heading}</Typography>
                      <Typography variant="body1">{link?.copy}</Typography>
                      <Button variant="contained" type="submit" className="button button--border">
                        {en.landingPage.findOutMore}
                      </Button>
                    </Box>
                  </Box>
                ))}
              </SliderComponent>
            </Box>
          ) : (
            <Box className="accordionItem">
              {socialLinks?.map((link, index) => (
                <Fragment key={index}>
                  <Box className="accordionItem__link">
                    <Box className="accordionItem__image">
                      <Image src={link?.image?.sizes?.['vs-container']} alt={link?.heading} width={1024} height={430} />
                    </Box>
                    <Box className="accordionItem__full">
                      <Typography variant="h2">{link?.heading}</Typography>
                      <Typography variant="body1">{link?.copy}</Typography>
                      <Button variant="contained" type="submit" className="button button--border">
                        {en.landingPage.findOutMore}
                      </Button>
                    </Box>
                  </Box>
                </Fragment>
              ))}
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default SocialAccordion;
