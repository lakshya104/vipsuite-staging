'use client';
import React from 'react';
import Image from 'next/image';
import { Box, Container, Typography } from '@mui/material';
import { find, get } from 'lodash';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ItemRequestForm from '@/features/ItemRequestForm';
import { Product } from '@/interfaces/brand';
import ArrowBackBtn from './ArrowBackBtn';
import RedeemBox from './RedeemBox';
import HighEndItemMessage from './HighEndItemMessage';
import ShowHtml from './ShowHtml';
import { DefaultImageFallback } from '@/helpers/enums';
import en from '@/helpers/lang';

interface ProductsContainerProps {
  product: Product;
  isUserAgent: boolean;
}

const ProductsContainer: React.FC<ProductsContainerProps> = ({ product, isUserAgent }) => {
  const isRequestOnly = product?.acf?.is_request_only || false;
  const showOffers =
    get(find(product?.meta_data, { key: 'show_offers' }), 'value') === '1' || product?.acf?.show_offers || false;
  const isHighEndItem = product?.is_high_end_item;
  const productImage = product?.images?.[0]?.sizes?.['vs-container'] || DefaultImageFallback.Placeholder;

  const settings = {
    dots: product?.gallery_images?.length > 1 && true,
    infinite: product?.gallery_images?.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    appendDots: (dots: React.ReactNode) => (
      <Box
        sx={{
          position: 'absolute',
          bottom: '-50px', // Position dots below the slider
          width: '100%',
          textAlign: 'center',
          '& ul': {
            margin: 0,
            padding: 0,
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
          },
        }}
      >
        {dots}
      </Box>
    ),
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const SliderComponent = Slider as unknown as React.ComponentType<any>;

  return (
    <Box className="product-details__page">
      <Container>
        <Typography className="page-title" variant="h2" component="h1" gutterBottom>
          <ArrowBackBtn />
          {product?.name}
        </Typography>
        <Box
          className="opportunity-product__detail"
          sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}
        >
          <Box
            sx={{
              position: 'relative',
              marginBottom: 2,
              width: { xs: '100%', md: '50%' },
              '& .slick-dots': {
                position: 'static',
                bottom: 'auto',
                '& li': {
                  margin: '0 0',
                  '& button': {
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    border: 'none',
                    '&:before': {
                      display: 'none',
                    },
                  },
                  '&.slick-active button': {
                    backgroundColor: 'black',
                  },
                },
              },
            }}
          >
            {product?.gallery_images?.length > 1 ? (
              <SliderComponent {...settings}>
                {product?.gallery_images.map((src, index) => (
                  <Box
                    key={index}
                    sx={{
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: 1,
                    }}
                  >
                    <Image
                      style={{ objectFit: 'cover' }}
                      priority
                      src={src?.sizes['vs-container']}
                      alt={`Slide ${index + 1}`}
                      height={500}
                      unoptimized={true}
                      quality={100}
                      width={500}
                      placeholder="blur"
                      blurDataURL={DefaultImageFallback.LandscapePlaceholder}
                    />
                  </Box>
                ))}
              </SliderComponent>
            ) : (
              <Image
                src={productImage}
                alt={product?.name}
                height={500}
                width={500}
                placeholder="blur"
                blurDataURL={DefaultImageFallback.LandscapePlaceholder}
              />
            )}
            {isRequestOnly && (
              <Box className="featuredBox">
                <Typography className="featuredText" variant="overline">
                  {en.products.requestOnly}
                </Typography>
              </Box>
            )}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" gutterBottom>
              {product?.brand_name}
            </Typography>
            <Typography variant="h2" component="h2" gutterBottom>
              {product?.name}
            </Typography>
            {isHighEndItem && <HighEndItemMessage />}
            <ShowHtml text={product?.description} />
            <ItemRequestForm product={product} isRequestOnly={isRequestOnly} isUserAgent={isUserAgent}>
              {showOffers && <RedeemBox fetchOffers={showOffers} />}
            </ItemRequestForm>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductsContainer;
