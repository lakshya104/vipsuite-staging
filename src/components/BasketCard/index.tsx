'use client';
import React, { Fragment } from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import ContinueToCartBtn from '@/components/ContinueToCartBtn';
import './Basket.scss';
import { Cart } from '@/interfaces';
import DeleteItemFromCartBtn from '../DeleteItemFromCartBtn';
import he from 'he';
import { get } from 'lodash';
import RemoveAllItemsBtn from '../RemoveAllItemsBtn';
import ErrorFallback from '../ErrorFallback';
import { DefaultImageFallback } from '@/helpers/enums';

interface BasketCardProps {
  cartData: Cart;
  token: string;
  nonce: string;
  onNext: () => void;
  startTransition: typeof import('react').startTransition;
}

const BasketCard: React.FC<BasketCardProps> = ({ cartData, token, nonce, startTransition, onNext }) => {
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
              const productImage = product?.images[0]?.src || DefaultImageFallback.placeholder;
              return (
                <Box className="basket-product__item" key={product.id}>
                  <Image src={productImage} alt={product?.name} height={110} width={110} />
                  <Box className="product-info">
                    <Typography gutterBottom variant="h2">
                      {he.decode(product?.brand_name)}
                    </Typography>
                    <Typography variant="body1">{he.decode(product?.name)}</Typography>
                    {product.type === 'variation' && (
                      <>
                        {product?.variation[0] && (
                          <Typography variant="body1">
                            {product?.variation[0]?.attribute}: {product?.variation[0].value}
                          </Typography>
                        )}
                        {product?.variation[1] && (
                          <Typography variant="body1">
                            {product?.variation[1]?.attribute}: {product?.variation[1]?.value}
                          </Typography>
                        )}
                        {product?.variation[2] && (
                          <Typography variant="body1">
                            {product?.variation[2]?.attribute}: {product?.variation[2]?.value}
                          </Typography>
                        )}
                        {product?.variation[3] && (
                          <Typography variant="body1">
                            {product?.variation[3]?.attribute}: {product?.variation[3]?.value}
                          </Typography>
                        )}
                      </>
                    )}
                  </Box>
                  <DeleteItemFromCartBtn
                    itemKey={product.key}
                    token={token}
                    nonce={nonce}
                    startTransition={startTransition}
                  />
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
              <RemoveAllItemsBtn token={token} nonce={nonce} startTransition={startTransition} />
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
