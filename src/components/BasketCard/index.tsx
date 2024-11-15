'use client';
import React, { Fragment } from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import ContinueToCartBtn from '@/components/ContinueToCartBtn';
import './Basket.scss';
import { Cart } from '@/interfaces';
import DeleteItemFromCartBtn from '../DeleteItemFromCartBtn';
import he from 'he';
import { get, take } from 'lodash';
import ErrorFallback from '../ErrorFallback';
import { DefaultImageFallback } from '@/helpers/enums';

interface BasketCardProps {
  cartData: Cart;
  onNext: () => void;
  startTransition: typeof import('react').startTransition;
}

const BasketCard: React.FC<BasketCardProps> = ({ cartData, startTransition, onNext }) => {
  const cartItems = get(cartData, 'items', []);
  return (
    <Fragment>
      <Box className="address-page__head">
        <Typography className="page-title" variant="h2" align="center" component="h1" gutterBottom>
          Basket
        </Typography>
      </Box>
      <Box className="basket-product__items">
        {cartItems?.length > 0 ? (
          <>
            {cartItems.map((product) => {
              const productImage = product.image_url || DefaultImageFallback.Placeholder;
              return (
                <Box className="basket-product__item" key={product.id}>
                  <Image src={productImage} alt={product?.name} height={110} width={110} />
                  <Box className="product-info">
                    <Typography gutterBottom variant="h2">
                      {he.decode(product?.brand_name)}
                    </Typography>
                    <Typography variant="body1"> {he.decode(product?.name)}</Typography>
                    {product.type === 'variation' &&
                      take(product.variation, 5).map(
                        (variation, index) =>
                          variation && (
                            <Typography key={index} variant="body1">
                              {variation?.attribute}: {variation?.value}
                            </Typography>
                          ),
                      )}
                  </Box>
                  <DeleteItemFromCartBtn productId={product.id} startTransition={startTransition} />
                </Box>
              );
            })}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: 2,
                flexDirection: { xs: 'column-reverse', md: 'row' },
              }}
            >
              <ContinueToCartBtn onNext={onNext} />
            </Box>
          </>
        ) : (
          <ErrorFallback errorMessage="Your cart is empty" hideSubtext={true} />
        )}
      </Box>
    </Fragment>
  );
};

export default BasketCard;
