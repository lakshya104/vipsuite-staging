'use client';
import React, { useState } from 'react';
import { defaultValues, formSchema, ProductFormValues } from '@/features/ItemRequestForm/schema';
import Btn from '@/components/Button/CommonBtn';
import SelectBox from '@/components/SelectBox';
import VIPSuiteDialog from '@/components/VIPSuiteDialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ProductDetail } from '@/interfaces/product';
import { useStore } from '@/store/useStore';

const DialogBtns = [
  { href: '/products', text: 'Continue Browsing' },
  { href: '/basket', text: 'Go to Basket' },
];

interface ItemRequestFormProps {
  options: { value: string; label: string }[] | undefined;
  data: ProductDetail;
}

const ItemRequestForm: React.FC<ItemRequestFormProps> = ({ options, data }) => {
  const addProduct = useStore((state) => state.addProduct);
  const [open, setOpen] = useState(false);
  const [basket, setBasket] = useState(data);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = (size: ProductFormValues) => {
    basket.size = size.size;
    setBasket(basket);
    addProduct(basket);
    setOpen(true);
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} className="product-size">
        <SelectBox
          name={'size'}
          control={control}
          placeholder={'Select sizes...'}
          options={options}
          label={'Select sizes...'}
          errors={errors}
        />
        <Btn look="dark-filled" width="100%" type="submit" fullWidth>
          Request
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
