'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Backdrop, Box, CircularProgress, Container, Typography } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, AddAddressFormValue } from './schema';
import InputTextFormField from '@/components/InputTextFormField';
import Toaster from '@/components/Toaster';
import Btn from '@/components/Button/CommonBtn';
import UseToaster from '@/hooks/useToaster';
import { addUpdateAddress } from '@/libs/api-manager/manager';
import './AddressForm.scss';

type FormFieldNames =
  | 'first_name'
  | 'last_name'
  | 'address_line_1'
  | 'address_line_2'
  | 'city'
  | 'postcode'
  | 'state'
  | 'country'
  | 'phone'
  | 'company';

interface AddressFormProps {
  userId: number;
  token: string;
  defaultValues: AddAddressFormValue;
  addressId?: number;
}

const AddressForm: React.FC<AddressFormProps> = ({ userId, token, defaultValues, addressId }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();

  const addNewAddressField = [
    {
      name: 'first_name',
      placeholder: 'First Name',
    },
    {
      name: 'last_name',
      placeholder: 'Last Name',
    },
    {
      name: 'address_line_1',
      placeholder: 'Address Line 1',
    },
    {
      name: 'address_line_2',
      placeholder: 'Address Line 2',
    },
    {
      name: 'city',
      placeholder: 'City',
    },
    {
      name: 'state',
      placeholder: 'State',
    },
    {
      name: 'country',
      placeholder: 'Country',
    },
    {
      name: 'postcode',
      placeholder: 'Postcode',
    },
    {
      name: 'phone',
      placeholder: 'Phone',
    },
    {
      name: 'company',
      placeholder: 'Company',
    },
  ];

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddAddressFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: AddAddressFormValue) => {
    setIsLoading(true);
    try {
      await addUpdateAddress(userId, token, data, addressId);
    } catch (error) {
      console.error('Error during add address:', error);
      openToaster('Error during add address: ' + error);
    } finally {
      setIsLoading(false);
      router.push('/addresses');
    }
  };
  return (
    <Box className="address-form">
      <Container>
        <Box className="address-form__head">
          <Typography className="page-title" variant="h2" align="center" component="h1">
            {defaultValues.first_name.length > 0 ? 'Edit' : 'Add'} Address
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} className="profile-builder__form">
          {addNewAddressField.map(({ name, placeholder }) => (
            <Box key={name} width="100%">
              <InputTextFormField
                name={name as FormFieldNames}
                placeholder={placeholder}
                control={control}
                errors={errors}
              />
            </Box>
          ))}
          <Btn look="dark-filled" width="100%" fullWidth type="submit">
            Continue
          </Btn>
          <Backdrop open={isLoading}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity="error" />
        </Box>
      </Container>
    </Box>
  );
};

export default AddressForm;
