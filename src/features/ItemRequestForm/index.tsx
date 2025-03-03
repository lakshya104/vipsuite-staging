'use client';
import React, { Fragment, useState, useTransition } from 'react';
import { Backdrop, Box, Button, CircularProgress, Dialog, DialogContent, Typography } from '@mui/material';
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
import revalidatePathAction from '@/libs/actions';
import EsignModal from '@/components/EsignModal';
import en from '@/helpers/lang';
import { paths, withSearchParams } from '@/helpers/paths';
import RenderQuestions from '@/components/RenderQuestions';
import { mapQuestionsToSchema } from '@/helpers/utils';

interface ItemRequestFormProps {
  product: Product;
  isRequestOnly: boolean;
  children: React.ReactNode;
}

const ItemRequestForm: React.FC<ItemRequestFormProps> = ({ product, isRequestOnly, children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [productId, setProductId] = useState<number>(product.id);
  const [openESignModel, setOpenESignModel] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { product_ordered: isProductOrdered = false } = product;
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const { dropdowns, onChangeDropDown, getSelectedProductVariation, formSchema } = useProductFilters(product);
  const { setRequestProductId, setQuestions, setRequestESign, setOpportunityId, clearAllRequestStore } =
    useRequestOnlyStore();
  const isHighEndItem = product?.is_high_end_item;
  const [fileName, setFileName] = useState<string | null>(null);
  const questionFormSchema = mapQuestionsToSchema(product?.questions);
  const combinedSchema = questionFormSchema ? formSchema.merge(questionFormSchema) : formSchema;
  const {
    handleSubmit,
    control,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(combinedSchema),
    defaultValues:
      (product?.questions &&
        product?.questions?.reduce(
          (acc, question) => {
            const fieldName = question.title.toLowerCase().replace(/[^a-z0-9]/g, '');
            acc[fieldName] = question.input_type === 'checkboxes' ? [] : '';
            return acc;
          },
          {} as Record<string, unknown>,
        )) ||
      {},
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createOrder = async (item: any, updatedPayload?: any) => {
    startTransition(async () => {
      try {
        if (isRequestOnly) {
          clearAllRequestStore();
          setOpportunityId(product.opportunity_id);
          if (!isEmpty(product?.questions)) {
            setQuestions(updatedPayload);
          }
          if (product?.type === 'variable') {
            setProductId(item.id);
            setRequestProductId(item.id);
          } else {
            setProductId(product.id);
            setRequestProductId(product.id);
          }
          if (isHighEndItem) {
            setOpenESignModel(true);
          } else {
            router.push(withSearchParams(() => paths.root.basket.getHref(), { step: 1, isRequestOnly: 'true' }));
          }
        } else {
          if (isEmpty(product?.questions)) {
            const addToCart = await AddItemToCart(item?.id, { opportunity_id: product?.opportunity_id });
            await revalidatePathAction(paths.root.basket.getHref());
            if (addToCart && addToCart.code === 'permission_denied') {
              openToaster(addToCart.message?.toString());
            } else {
              setOpen(true);
            }
          } else {
            setProductId(item.id);
            try {
              const payload = {
                product_id: item?.id,
                questions: updatedPayload,
                opportunity_id: product?.opportunity_id,
              };
              const addToCart = await AddItemToCart(item.id, payload);
              await revalidatePathAction(paths.root.basket.getHref());
              reset();
              if (addToCart && addToCart.code === 'permission_denied') {
                openToaster(addToCart.message?.toString());
              } else {
                setOpen(true);
              }
            } catch (error) {
              openToaster(error?.toString() || en.products.itemRequestForm.addToCartError);
            }
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

  const onESignChange = async (signature: string) => {
    startTransition(async () => {
      try {
        if (signature !== '') {
          setRequestESign(signature);
          if (product?.type === 'variable') {
            setRequestProductId(productId);
          } else {
            setRequestProductId(product.id);
          }
          setOpenESignModel(false);
          router.push(withSearchParams(() => paths.root.basket.getHref(), { step: 1, isRequestOnly: 'true' }));
        }
      } catch (error) {
        openToaster(error?.toString() || en.products.itemRequestForm.eSignError);
      }
    });
  };

  const handleClose = (event: unknown, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick') {
      return;
    }
    setOpen(false);
  };

  const handleESignModel = (open: boolean) => {
    setOpenESignModel(open);
  };

  const getProductData = () => {
    const productVariation = getSelectedProductVariation();
    if (product?.type === 'variable' && productVariation) {
      productVariation.quantity = 1;
      return productVariation;
    } else {
      return {
        id: product.id,
        quantity: 1,
      };
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    const updatedPayload =
      product?.questions &&
      (await Promise.all(
        product?.questions.map(async (field) => {
          const key = field?.title.toLowerCase().replace(/[^a-z0-9]/g, '');
          let answer;
          if (field?.input_type === 'file_upload' && field?.is_required) {
            answer = await convertToBase64(data[key]);
          } else {
            answer = data[key];
          }
          return {
            ...field,
            answer,
          };
        }),
      ));
    const prepareItem = getProductData();
    await createOrder(prepareItem, updatedPayload);
  };

  return (
    <>
      {product.type === 'variable' && (
        <Box
          component="form"
          onSubmit={handleSubmit((data) => {
            onSubmit(data);
            reset();
            setFileName(null);
          })}
          className="product-size"
        >
          {!isProductOrdered && (
            <Typography
              sx={{ fontWeight: 500, color: 'rgb(27, 27, 27) !important', mb: 1, fontSize: '1rem !important' }}
              gutterBottom
            >
              Select variant
            </Typography>
          )}
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
                <Box key={firstItem.slug} className="product-size__select">
                  <Fragment>
                    <SelectBox
                      name={name}
                      control={control}
                      placeholder={`Select ${name}`}
                      options={options}
                      label={`Select ${name}`}
                      errors={errors}
                      onChange={(value) => {
                        clearErrors(name);
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
                </Box>
              );
            })}
          {children}
          {product?.questions && (
            <Box className="site-dialog__content">
              <RenderQuestions
                noHeading={true}
                questions={product?.questions}
                control={control}
                errors={errors}
                fileName={fileName}
                setFileName={setFileName}
              />
            </Box>
          )}
          <Button
            className="button button--black"
            sx={{ marginTop: { xs: '10px', md: '40px' } }}
            type="submit"
            fullWidth
            disabled={isProductOrdered}
          >
            {!isProductOrdered ? product.cta_label : en.products.itemRequestForm.requested}
          </Button>
        </Box>
      )}
      {product?.type === 'simple' && (
        <Box
          component="form"
          onSubmit={handleSubmit((data) => {
            onSubmit(data);
            reset();
            setFileName(null);
          })}
          className="product-size product-size--request"
        >
          {children}
          {product?.questions && (
            <Box className="site-dialog__content">
              <RenderQuestions
                noHeading={true}
                questions={product?.questions}
                control={control}
                errors={errors}
                fileName={fileName}
                setFileName={setFileName}
              />
            </Box>
          )}
          <Btn
            look="dark-filled"
            className="button button--black"
            style={{ marginTop: '40px' }}
            width="100%"
            fullWidth
            type="submit"
            disabled={isProductOrdered}
          >
            {!isProductOrdered
              ? product.cta_label || en.products.itemRequestForm.request
              : en.products.itemRequestForm.requested}
          </Btn>
        </Box>
      )}
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity="error" />
      <Backdrop sx={{ zIndex: 10000 }} open={isPending}>
        <CircularProgress />
      </Backdrop>
      <Dialog className="site-dialog" open={open} onClose={handleClose}>
        <DialogContent className="site-dialog__inner">
          <Box>
            <Typography align="center" className="site-dialog__title" variant="h3" component="h2">
              {en.products.itemRequestForm.dialog.title}
            </Typography>
            <Box my={3.5} width="100%">
              <Button
                onClick={() => {
                  startTransition(async () => {
                    router.push(paths.root.products.getHref());
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
                    await revalidatePathAction(paths.root.basket.getHref());
                    router.push(paths.root.basket.getHref());
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
