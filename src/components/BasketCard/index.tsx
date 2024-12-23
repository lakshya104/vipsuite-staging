'use client';
import React, { Fragment, useState } from 'react';
import Image from 'next/image';
import he from 'he';
import { get, some, take } from 'lodash';
import { Box, Typography } from '@mui/material';
import ContinueToCartBtn from '@/components/ContinueToCartBtn';
import './Basket.scss';
import { Cart } from '@/interfaces';
import DeleteItemFromCartBtn from '../DeleteItemFromCartBtn';
import ErrorFallback from '../ErrorFallback';
import { DefaultImageFallback } from '@/helpers/enums';
import en from '@/helpers/lang';
import HighEndItemMessage from '../HighEndItemMessage';
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
        onNext();
      } catch (error) {
        openToaster(error?.toString() ?? 'Error processing E Sign');
      } finally {
        setOpenESignModel(false);
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
              const productImage = product.image_url || DefaultImageFallback.Placeholder;
              return (
                <Box className="basket-product__item" key={product.id}>
                  <Image src={productImage} alt={product?.name} height={110} width={110} />
                  <Box className="product-info">
                    <Typography gutterBottom variant="h2">
                      {he.decode(product?.brand_name)}
                    </Typography>
                    <Typography variant="body1"> {he.decode(product?.name)}</Typography>
                    {product.is_high_end_item && <HighEndItemMessage />}
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
