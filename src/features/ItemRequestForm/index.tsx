'use client';
import React, { Fragment, useState, useTransition } from 'react';
import { Backdrop, Box, Button, CardContent, CircularProgress, Dialog, DialogContent, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { first, isEmpty } from 'lodash';
import Btn from '@/components/Button/CommonBtn';
import SelectBox from '@/components/SelectBox';
import { zodResolver } from '@hookform/resolvers/zod';
import { Product } from '@/interfaces/brand';
import { AddItemToCart } from '@/libs/api-manager/manager';
import UseToaster from '@/hooks/useToaster';
import Toaster from '@/components/Toaster';
import { useProductFilters } from '@/hooks/useProductFilters';
import { useRequestOnlyStore } from '@/store/useStore';
import DynamicForm from '../DynamicForm';
import revalidatePathAction from '@/libs/actions';
import EsignModal from '@/components/EsignModal';
import en from '@/helpers/lang';

interface ItemRequestFormProps {
  product: Product;
  isRequestOnly: boolean;
}

const ItemRequestForm: React.FC<ItemRequestFormProps> = ({ product, isRequestOnly }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [productId, setProductId] = useState<number>(product.id);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [openESignModel, setOpenESignModel] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { product_ordered: isProductOrdered = false } = product;
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const { dropdowns, onChangeDropDown, getSelectedProductVariation, formSchema } = useProductFilters(product);
  const {
    setRequestProductId,
    clearRequestProductId,
    clearQuestions,
    setQuestions,
    setRequestESign,
    clearRequestESign,
  } = useRequestOnlyStore();
  const isHighEndItem = product?.is_high_end_item;

  const {
    handleSubmit,
    control,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createOrder = async (item: any) => {
    startTransition(async () => {
      try {
        if (isRequestOnly) {
          clearRequestProductId();
          clearQuestions();
          clearRequestESign();
          if (isEmpty(product.questions)) {
            if (isHighEndItem) {
              setOpenESignModel(true);
            } else {
              if (product.type === 'variable') {
                setRequestProductId(productId);
              } else {
                setRequestProductId(product.id);
              }
              router.push(`/basket?step=1&isRequestOnly=true`);
            }
          } else {
            setProductId(item.id);
            setDialogOpen(true);
          }
        } else {
          if (isEmpty(product.questions)) {
            const addToCart = await AddItemToCart(item.id);
            await revalidatePathAction('/basket');
            if (addToCart && addToCart.code === 'permission_denied') {
              openToaster(addToCart.message?.toString());
            } else {
              setOpen(true);
            }
          } else {
            setProductId(item.id);
            setDialogOpen(true);
          }
        }
      } catch (error) {
        openToaster(error?.toString() || en.products.itemRequestForm.addToCartError);
      }
    });
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64String = result.replace(/^data:[^;]+;base64,/, '');
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmitDynamic = async (data: any) => {
    startTransition(async () => {
      const updatedPayload = await Promise.all(
        product.questions.map(async (field) => {
          const key = field.title.toLowerCase().replace(/[^a-z0-9]/g, '');
          let answer;
          if (field.input_type === 'file_upload') {
            answer = await convertToBase64(data[key]);
          } else {
            answer = data[key];
          }
          return {
            ...field,
            answer,
          };
        }),
      );
      if (isRequestOnly) {
        setQuestions(updatedPayload);
        if (isHighEndItem) {
          setDialogOpen(false);
          setOpenESignModel(true);
        } else {
          if (product.type === 'variable') {
            setRequestProductId(productId);
          } else {
            setRequestProductId(product.id);
          }
          router.push(`/basket?step=1&isRequestOnly=true`);
        }
      } else {
        try {
          const payload = {
            product_id: productId,
            questions: updatedPayload,
          };
          const addToCart = await AddItemToCart(productId, payload);
          await revalidatePathAction('/basket');
          if (addToCart && addToCart.code === 'permission_denied') {
            openToaster(addToCart.message?.toString());
          } else {
            setDialogOpen(false);
            setOpen(true);
          }
        } catch (error) {
          openToaster(error?.toString() || en.products.itemRequestForm.addToCartError);
        }
      }
    });
  };

  const onESignChange = async (signature: string) => {
    startTransition(async () => {
      try {
        if (signature !== '') {
          setRequestESign(signature);
          if (product.type === 'variable') {
            setRequestProductId(productId);
          } else {
            setRequestProductId(product.id);
          }
          setOpenESignModel(false);
          router.push(`/basket?step=1&isRequestOnly=true`);
        }
      } catch (error) {
        openToaster(error?.toString() || en.products.itemRequestForm.eSignError);
      }
    });
  };

  const handleESignModel = (open: boolean) => {
    setOpenESignModel(open);
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
    await createOrder(prepareItem);
  };

  const handleAddToCart = async () => {
    const prepareItem = getProductData();
    await createOrder(prepareItem);
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
            {!isProductOrdered ? en.products.itemRequestForm.request : en.products.itemRequestForm.requested}
          </Btn>
        </Box>
      )}
      {product.type === 'simple' && (
        <Box className="product-size">
          <Btn
            look="dark-filled"
            className="button button--black"
            width="100%"
            fullWidth
            disabled={isProductOrdered}
            onClick={handleAddToCart}
          >
            {!isProductOrdered ? en.products.itemRequestForm.request : en.products.itemRequestForm.requested}
          </Btn>
        </Box>
      )}
      <Dialog className="site-dialog" open={dialogOpen} fullWidth maxWidth="sm" onClose={() => setDialogOpen(false)}>
        <DialogContent>
          <Box>
            <CardContent className="site-dialog__content">
              <DynamicForm questions={product.questions} onSubmit={onSubmitDynamic} type="product" />
            </CardContent>
          </Box>
        </DialogContent>
      </Dialog>
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity="error" />
      <Backdrop sx={{ zIndex: 10000 }} open={isPending}>
        <CircularProgress />
      </Backdrop>
      <Dialog className="site-dialog" open={open} onClose={() => setOpen(false)}>
        <DialogContent className="site-dialog__inner">
          <Box>
            <Typography align="center" className="site-dialog__title" variant="h3" component="h2">
              {en.products.itemRequestForm.dialog.title}
            </Typography>
            <Box my={3.5} width="100%">
              <Button
                onClick={() => {
                  startTransition(async () => {
                    router.push('/products');
                  });
                }}
                fullWidth
                variant="contained"
                className="button  button--black"
              >
                {en.products.itemRequestForm.dialog.ctaOne}
              </Button>
              <Button
                onClick={() => {
                  startTransition(async () => {
                    await revalidatePathAction('/basket');
                    router.push('/basket');
                  });
                }}
                className="button  button--black"
              >
                {en.products.itemRequestForm.dialog.ctaTwo}
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
      <EsignModal onESignChange={onESignChange} ESignOpen={openESignModel} handleESignModel={handleESignModel} />
    </>
  );
};

export default ItemRequestForm;
