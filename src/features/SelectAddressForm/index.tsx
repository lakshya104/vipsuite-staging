'use client';
import React, { Fragment, useState } from 'react';
import { Box, Button, Checkbox, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ConfirmOrderBtn from '@/components/ConfirmOrderBtn';
import { Address, Cart } from '@/interfaces';
import { ProgressBarLink } from '@/components/ProgressBar';
import ErrorFallback from '@/components/ErrorFallback';
import { useUserInfoStore } from '@/store/useStore';
import { useSearchParams } from 'next/navigation';
import en from '@/helpers/lang';

interface SelectAddressFormProps {
  addresses: Address[];
  cartData: Cart;
  onPrevious?: () => void;
  startTransition: typeof import('react').startTransition;
  productImage: string;
  signatureData: string;
}
const SelectAddressForm: React.FC<SelectAddressFormProps> = ({
  addresses,
  cartData,
  onPrevious,
  startTransition,
  productImage,
  signatureData,
}) => {
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const { vipIdStore } = useUserInfoStore();
  const searchParams = useSearchParams();
  const isRequestedProduct = searchParams.get('isRequestOnly');
  const handleAddressChange = (address: Address) => {
    setSelectedAddress((prevAdd) => (prevAdd === address ? null : address));
  };
  const href = isRequestedProduct
    ? `/my-addresses/add?route=order-journey&isRequestOnly=true`
    : `/my-addresses/add?route=order-journey`;
  return (
    <Fragment>
      <Box className="address-page__head">
        <Button onClick={onPrevious} className="button-arrow">
          <ArrowBackIcon />
        </Button>
        <Typography className="page-title" variant="h2" align="center" component="h1">
          Select Address
        </Typography>
        <ProgressBarLink className="button button--black" href={href}>
          Add <AddIcon />
        </ProgressBarLink>
      </Box>
      {addresses.length > 0 ? (
        <>
          {addresses.map((add, index) => (
            <Box className="address__list" key={index}>
              <Box className="address__list-info">
                <Typography gutterBottom variant="h3" component="h2">
                  {add.first_name} {add.last_name}
                </Typography>
                <Typography variant="body2">{`${add?.address_line_1}, ${add?.address_line_2}, ${add?.city}, ${add?.state},`}</Typography>
                <Typography variant="body2">{`${add?.country}, ${add?.postcode},`}</Typography>
                <Typography variant="body2">
                  {add?.company ? `${add.company} , (${add?.phone})` : `(${add?.phone})`}
                </Typography>
              </Box>
              <Checkbox checked={selectedAddress === add} onChange={() => handleAddressChange(add)} />
            </Box>
          ))}
          <Box className="address__list-action">
            <ConfirmOrderBtn
              selectedAddress={selectedAddress}
              cartData={cartData}
              startTransition={startTransition}
              vipId={vipIdStore}
              productImage={productImage}
              signatureData={signatureData}
            />
          </Box>
        </>
      ) : (
        <ErrorFallback
          errorMessage={en.listEmptyMessage.noAddressData}
          hideSubtext={true}
          subtext={en.listEmptyMessage.addItemMessage}
        />
      )}
    </Fragment>
  );
};

export default SelectAddressForm;
