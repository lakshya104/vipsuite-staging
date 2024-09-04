'use client';
import React, { useState } from 'react';
import { defaultValues, formSchema, ProductFormValues } from '@/features/ItemRequestForm/schema';
import Btn from '@/components/Button/CommonBtn';
import SelectBox from '@/components/SelectBox';
import VIPSuiteDialog from '@/components/VIPSuiteDialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
// import { useStore } from '@/store/useStore';
import { BrandProductDetails } from '@/interfaces/brand';
import { useRouter } from 'next/navigation';
import { AddItemToCart } from '@/libs/api-manager/manager';
import UseToaster from '@/hooks/useToaster';
import Toaster from '@/components/Toaster';

interface ItemRequestFormProps {
  options: { value: string; label: string }[] | undefined | null;
  data: BrandProductDetails;
  token: string;
  nonce: string;
}

const ItemRequestForm: React.FC<ItemRequestFormProps> = ({ options, data, token, nonce }) => {
  // const addProduct = useStore((state) => state.addProduct);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  // const isProductOrdered = data?.product_ordered;
  const isProductOrdered = false;
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
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

  const onSubmit = async (size: ProductFormValues) => {
    const item = {
      id: data.id,
      quantity: 1,
      variation: [
        {
          attribute: 'pa_size',
          value: size.size,
        },
      ],
    };
    await AddItemToCart(token, item, nonce);
    // setOpen(true);
  };

  const handleAddToCart = async () => {
    if (!options) {
      const item = {
        id: data.id,
        quantity: 1,
      };
      try {
        await AddItemToCart(token, item, nonce);
      } catch (error) {
        openToaster('Error during adding product: ' + error?.toString());
      }
    }
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} className="product-size">
        {options && !isProductOrdered && (
          <SelectBox
            name={'size'}
            control={control}
            placeholder={'Select sizes...'}
            options={options}
            label={'Select sizes'}
            errors={errors}
          />
        )}
        <Btn
          look="dark-filled"
          width="100%"
          type="submit"
          fullWidth
          onClick={handleAddToCart}
          disabled={isProductOrdered}
        >
          {!isProductOrdered ? ' Request' : ' Requested'}
        </Btn>
      </Box>
      <VIPSuiteDialog
        isOpen={open}
        onClose={() => setOpen(false)}
        withLogo={false}
        buttonsArray={DialogBtns}
        title="Added to Basket"
      />
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity="error" />
    </>
  );
};

export default ItemRequestForm;
