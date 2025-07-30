'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { Backdrop, Box, CircularProgress, Container, Typography } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, AddAddressFormValue, addNewAddressField } from './schema';
import InputTextFormField from '@/components/InputTextFormField';
import Toaster from '@/components/Toaster';
import Btn from '@/components/Button/CommonBtn';
import UseToaster from '@/hooks/useToaster';
import { addUpdateAddress } from '@/libs/api-manager/manager';
import './AddressForm.scss';
import revalidatePathAction from '@/libs/actions';
import en from '@/helpers/lang';
import { paths, withSearchParams } from '@/helpers/paths';
import { ShippingCountry } from '@/interfaces';
import { QuestionType } from '@/helpers/enums';
import AutoCompleteSelector from '@/components/AutoCompleteSelector';

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
  defaultValues: AddAddressFormValue;
  addressId?: string;
  shippingCountries: ShippingCountry[];
}

const AddressForm: React.FC<AddressFormProps> = ({ defaultValues, addressId, shippingCountries }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const search = searchParams.get('route');
  const isRequestedProduct = searchParams.get('isRequestOnly');
  const isLookbookOrder = searchParams.get('isLookbook');
  const postId = searchParams.get('postId');
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const countryOptions = shippingCountries?.map((country) => ({
    label: country.name,
    value: country.code,
  }));
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
      await addUpdateAddress(data, addressId);
      if (search === 'order-journey') {
        if (isRequestedProduct) {
          router.push(withSearchParams(() => paths.root.basket.getHref(), { step: 1, isRequestOnly: 'true' }));
        }
        if (isLookbookOrder) {
          if (postId) {
            router.push(withSearchParams(() => paths.root.basket.getHref(), { step: 1, isLookbook: 'true', postId }));
          } else {
            router.push(withSearchParams(() => paths.root.basket.getHref(), { step: 1, isLookbook: 'true' }));
          }
        } else {
          router.push(withSearchParams(() => paths.root.basket.getHref(), { step: 1 }));
        }
        await revalidatePathAction(withSearchParams(() => paths.root.basket.getHref(), { step: 1 }));
      } else {
        await revalidatePathAction(paths.root.addresses.getHref());
        router.push(paths.root.addresses.getHref());
      }
    } catch (error) {
      openToaster(String(error));
      setIsLoading(false);
    } finally {
      router.refresh();
    }
  };
  return (
    <Box className="address-form">
      <Container>
        <Box className="address-form__head">
          <Typography className="page-title" variant="h2" align="center" component="h1">
            {defaultValues.first_name.length > 0 ? en.address.edit : en.address.add} {en.address.addresses}
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} className="profile-builder__form">
          {addNewAddressField.map(({ name, placeholder, type }, index) => (
            <Box key={name + index} width="100%">
              {type === QuestionType.Text ? (
                <InputTextFormField
                  name={name as FormFieldNames}
                  placeholder={placeholder}
                  control={control}
                  errors={errors}
                  autoFill={addressId ? false : true}
                />
              ) : (
                <AutoCompleteSelector
                  countryCodeOptions={countryOptions}
                  options={[]}
                  control={control}
                  name="country"
                  label={placeholder}
                />
              )}
              {name === 'phone' && (
                <Box className="input-text">
                  <Typography>{en.helperText.phone}</Typography>
                </Box>
              )}
            </Box>
          ))}
          <Btn look="dark-filled" width="100%" fullWidth disabled={isLoading} type="submit">
            {isLoading ? en.address.saving : en.address.continue}
          </Btn>
          <Backdrop sx={{ zIndex: 10000 }} open={isLoading}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity="error" />
        </Box>
      </Container>
    </Box>
  );
};

export default AddressForm;
