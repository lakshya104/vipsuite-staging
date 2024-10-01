'use client';
import React, { Fragment, useState, useEffect } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { Box, Button, Container, Typography } from '@mui/material';
import './SocialAccordion.scss';
import { PageData } from '@/interfaces/public-page';

// Import slick-carousel styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface SocialAccordionProps {
  data: PageData;
}

const SocialAccordion: React.FC<SocialAccordionProps> = ({ data }) => {
  const socialLinks = data?.acf?.content_modules?.[1]?.slides;
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

  return (
    <Container>
      <Box className="site-card__wrapper">
        {isMobile ? (
          <Box className="accordionItem">
            <Slider {...sliderSettings}>
              {socialLinks?.map((link, index) => (
                <Box key={index} className="accordionItem__link">
                  <Box className="accordionItem__image">
                    <Image src={link?.image?.sizes?.['vs-container']} alt={link?.heading} width={1024} height={430} />
                  </Box>
                  <Box className="accordionItem__full">
                    <Typography variant="h2">{link?.heading}</Typography>
                    <Typography variant="body1">{link?.copy}</Typography>
                    <Button variant="contained" type="submit" className="button button--border">
                      Find out more
                    </Button>
                  </Box>
                </Box>
              ))}
            </Slider>
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
                      Find out more
                    </Button>
                  </Box>
                </Box>
              </Fragment>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default SocialAccordion;
