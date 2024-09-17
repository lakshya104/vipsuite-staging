'use client';
import React, { Fragment, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ConfirmOrderBtn from '@/components/ConfirmOrderBtn';
import { Address, Cart } from '@/interfaces';
import { Box, Button, Checkbox, Typography } from '@mui/material';
import { ProgressBarLink } from '@/components/ProgressBar';
import AddIcon from '@mui/icons-material/Add';
import ErrorFallback from '@/components/ErrorFallback';

interface SelectAddressFormProps {
  addresses: Address[];
  token: string;
  cartData: Cart;
  nonce: string;
  onPrevious?: () => void;
  startTransition: typeof import('react').startTransition;
}
const SelectAddressForm: React.FC<SelectAddressFormProps> = ({
  addresses,
  token,
  cartData,
  nonce,
  onPrevious,
  startTransition,
}) => {
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const handleAddressChange = (address: Address) => {
    setSelectedAddress((prevAdd) => (prevAdd === address ? null : address));
  };

  return (
    <Fragment>
      <Box className="address-page__head">
        <Button onClick={onPrevious} className="button-arrow">
          <ArrowBackIcon />
        </Button>
        <Typography className="page-title" variant="h2" align="center" component="h1">
          Select Address
        </Typography>
        <ProgressBarLink className="button button--black" href="/my-addresses/add?route=order-journey">
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
                <Typography variant="body2">{`${add?.company}, (${add?.phone})`}</Typography>
              </Box>
              <Checkbox checked={selectedAddress === add} onChange={() => handleAddressChange(add)} />
            </Box>
          ))}
          <Box className="address__list-action">
            <ConfirmOrderBtn
              selectedAddress={selectedAddress}
              token={token}
              cartData={cartData}
              nonce={nonce}
              startTransition={startTransition}
            />
          </Box>
        </>
      ) : (
        <ErrorFallback errorMessage="No address available, please add one to continue" hideSubtext={true} />
      )}
    </Fragment>
  );
};

export default SelectAddressForm;
