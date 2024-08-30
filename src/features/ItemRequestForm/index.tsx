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

interface ItemRequestFormProps {
  options: { value: string; label: string }[] | undefined | null;
  data: BrandProductDetails;
}

const ItemRequestForm: React.FC<ItemRequestFormProps> = ({ options, data }) => {
  // const addProduct = useStore((state) => state.addProduct);
  const [open, setOpen] = useState(false);
  const [basket, setBasket] = useState(data);
  const router = useRouter();
  const isProductOrdered = data.product_ordered;
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
  const onSubmit = (size: ProductFormValues) => {
    setBasket(basket);
    const item = {
      id: basket.id,
      quantity: 1,
      variation: [
        {
          attribute: 'pa_size',
          value: size.size,
        },
      ],
    };
    console.log({ item });

    // addProduct(basket);
    // setOpen(true);
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
          onClick={() => {
            if (options === null) {
              setBasket(basket);
              // addProduct(basket);
              setOpen(true);
            }
          }}
          type="submit"
          fullWidth
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
    </>
  );
};

export default ItemRequestForm;
