'use client';
import React, { Fragment, useState } from 'react';
import Image from 'next/image';
import he from 'he';
import { get, some, take } from 'lodash';
import { Box, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import ContinueToCartBtn from '@/components/ContinueToCartBtn';
import './Basket.scss';
import { Cart } from '@/interfaces';
import DeleteItemFromCartBtn from '../DeleteItemFromCartBtn';
import ErrorFallback from '../ErrorFallback';
import { DefaultImageFallback } from '@/helpers/enums';
import en from '@/helpers/lang';
import EsignModal from '../EsignModal';
import Toaster from '../Toaster';
import UseToaster from '@/hooks/useToaster';

interface BasketCardProps {
  cartData: Cart;
  onNext: () => void;
  startTransition: typeof import('react').startTransition;
  // eslint-disable-next-line no-unused-vars
  handleSignature: (signature: string) => void;
}

const BasketCard: React.FC<BasketCardProps> = ({ cartData, startTransition, onNext, handleSignature }) => {
  const cartItems = get(cartData, 'items', []);
  const [openESignModel, setOpenESignModel] = useState<boolean>(false);
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const handleESignModel = (open: boolean) => {
    setOpenESignModel(open);
  };

  const onESignChange = async (signature: string) => {
    startTransition(async () => {
      try {
        handleSignature(signature);
        if (signature !== '') {
          onNext();
          setOpenESignModel(false);
        }
      } catch (error) {
        openToaster(error?.toString() ?? 'Error processing E Sign');
      }
    });
  };
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
              const productImage = product?.image_url || DefaultImageFallback.Placeholder;
              return (
                <Box className="basket-product__item" key={product.id}>
                  <Image src={productImage} alt={product?.name} height={110} width={110} style={{ borderRadius: 6 }} />
                  <Box className="product-info">
                    <Typography gutterBottom variant="h2">
                      {he.decode(product?.name)}
                    </Typography>
                    <Typography variant="body1">{he.decode(product?.brand_name)}</Typography>
                    <Box mb={0.5}>
                      {product.type === 'variation' &&
                        take(product?.variation, 5).map(
                          (variation, index) =>
                            variation && (
                              <Typography key={index} variant="body1">
                                {variation?.attribute}: {variation?.value}
                              </Typography>
                            ),
                        )}
                    </Box>
                    {product?.is_high_end_item && (
                      <Typography
                        fontSize={14}
                        display="inline"
                        variant="body1"
                        fontWeight={500}
                        sx={{ bgcolor: '#F0F0E5', p: 0.6, borderRadius: 2 }}
                      >
                        High End Product
                      </Typography>
                    )}
                  </Box>
                  <DeleteItemFromCartBtn productId={product?.id} startTransition={startTransition} />
                </Box>
              );
            })}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                gap: 2,
                flexDirection: 'column',
              }}
            >
              {some(cartItems, 'is_high_end_item') && (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <InfoIcon
                    sx={{
                      fontSize: 18,
                      cursor: 'pointer',
                      borderRadius: 2,
                      mr: 0.75,
                    }}
                  />
                  <Typography fontSize={14} variant="body1" fontWeight={400}>
                    Acceptance of the terms and conditions is required for high-end items, with e-signature available on
                    a later page.
                  </Typography>
                </Box>
              )}
              <ContinueToCartBtn
                onNext={() => {
                  if (some(cartItems, 'is_high_end_item')) {
                    setOpenESignModel(true);
                  } else {
                    onNext();
                  }
                }}
              />
            </Box>
          </>
        ) : (
          <ErrorFallback
            errorMessage={en.listEmptyMessage.noItems}
            hideSubtext={true}
            subtext={en.listEmptyMessage.addItemMessage}
          />
        )}
      </Box>
      <EsignModal onESignChange={onESignChange} ESignOpen={openESignModel} handleESignModel={handleESignModel} />
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity="error" />
    </Fragment>
  );
};

export default BasketCard;
