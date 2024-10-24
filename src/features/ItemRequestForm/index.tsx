'use client';
import React, { Fragment, useState } from 'react';
import { Backdrop, Box, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { first } from 'lodash';
import Btn from '@/components/Button/CommonBtn';
import SelectBox from '@/components/SelectBox';
import VIPSuiteDialog from '@/components/VIPSuiteDialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { Product } from '@/interfaces/brand';
import { AddItemToCart } from '@/libs/api-manager/manager';
import UseToaster from '@/hooks/useToaster';
import Toaster from '@/components/Toaster';
import { useProductFilters } from '@/hooks/useProductFilters';
import { revalidateTag } from '@/libs/actions';
import TAGS from '@/libs/apiTags';
import { useRequestOnlyStore } from '@/store/useStore';

interface ItemRequestFormProps {
  product: Product;
  token: string | null;
  nonce: string | null;
  isRequestOnly: boolean;
  vipId: number;
}

const ItemRequestForm: React.FC<ItemRequestFormProps> = ({ product, token, nonce, isRequestOnly, vipId }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { product_ordered: isProductOrdered = false } = product;
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const { dropdowns, onChangeDropDown, getSelectedProductVariation, formSchema } = useProductFilters(product);
  const { setRequestProductId, clearRequestProductId } = useRequestOnlyStore();

  const {
    handleSubmit,
    control,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const DialogBtns = [
    {
      text: 'Continue Browsing',
      onClick: () => {
        router.back();
      },
    },
    { href: '/basket', text: 'Go to Basket' },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createOrder = async (token: string | null, item: any, nonce: string | null) => {
    setLoading(true);
    try {
      if (isRequestOnly) {
        clearRequestProductId();
        setRequestProductId(product.id);
        router.push(`/basket?step=1&isRequestOnly=true`);
      } else {
        const addToCart = await AddItemToCart(token, item, nonce, vipId);
        await revalidateTag(TAGS.GET_VIP_CART);
        if (addToCart && addToCart.code === 'permission_denied') {
          openToaster('Error during adding product: ' + addToCart.message?.toString());
        } else {
          setOpen(true);
        }
      }
    } catch (error) {
      openToaster('Error during adding product: ' + error?.toString());
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  const getProductData = () => {
    const productVariation = getSelectedProductVariation();
    if (product.type === 'variable' && productVariation) {
      productVariation.quantity = 1;
      return productVariation;
    } else {
      return {
        id: product.id,
        quantity: 1,
      };
    }
  };
  const onSubmit = async () => {
    const prepareItem = getProductData();
    await createOrder(token, prepareItem, nonce);
    reset();
  };

  const handleAddToCart = async () => {
    const prepareItem = getProductData();
    await createOrder(token, prepareItem, nonce);
    reset();
  };

  return (
    <>
      {product.type === 'variable' && (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} className="product-size">
          {!isProductOrdered &&
            dropdowns.map((dropdown, index) => {
              const firstItem = first(dropdown)!;
              const name = firstItem.name;
              const options = dropdown.map(({ label, option }) => {
                return {
                  label,
                  value: option,
                };
              });
              return (
                <Fragment key={firstItem.slug}>
                  <SelectBox
                    name={name}
                    control={control}
                    placeholder={`Select ${name}`}
                    options={options}
                    label={`Select ${name}`}
                    errors={errors}
                    onChange={(value) => {
                      clearErrors();
                      for (let i = index + 1; i < dropdowns.length; ++i) {
                        const firstItem = first(dropdowns[i])!;
                        const name = firstItem.name;
                        setValue(name, undefined);
                      }

                      const selectedFilter = dropdown.find((item) => item.option === value);
                      if (selectedFilter) {
                        onChangeDropDown(selectedFilter, index);
                      }
                    }}
                  />
                </Fragment>
              );
            })}
          <Btn look="dark-filled" width="100%" type="submit" fullWidth disabled={isProductOrdered}>
            {!isProductOrdered ? 'Request' : 'Requested'}
          </Btn>
        </Box>
      )}
      {product.type === 'simple' && (
        <Box className="product-size">
          <Btn look="dark-filled" width="100%" fullWidth disabled={isProductOrdered} onClick={handleAddToCart}>
            {!isProductOrdered ? 'Request' : 'Requested'}
          </Btn>
        </Box>
      )}
      <VIPSuiteDialog
        isOpen={open}
        onClose={() => setOpen(false)}
        withLogo={false}
        buttonsArray={DialogBtns}
        title="Added to Basket"
      />
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity="error" />
      <Backdrop sx={{ zIndex: 10000 }} open={loading}>
        <CircularProgress />
      </Backdrop>
    </>
  );
};

export default ItemRequestForm;
