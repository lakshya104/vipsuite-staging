'use client';
import React, { Fragment, useState, useTransition } from 'react';
import BasketCard from '@/components/BasketCard';
import { Address, Cart } from '@/interfaces';
import { Backdrop, CircularProgress } from '@mui/material';
import SelectAddressForm from '../SelectAddressForm';
import { useSearchParams } from 'next/navigation';

interface OrderJourneyProps {
  addresses: Address[];
  token: string;
  customerId: number;
  cartData: Cart;
  nonce: string;
}

const OrderJourney: React.FC<OrderJourneyProps> = ({ addresses, token, customerId, cartData, nonce }) => {
  const searchParams = useSearchParams();
  const step = searchParams.get('step');
  const currentStep = step === '1' ? step : 0;
  const [activeStep, setActiveStep] = useState(Number(currentStep));
  const [isPending, startTransition] = useTransition();

  const handleNext = () => {
    startTransition(() => setActiveStep((prev) => prev + 1));
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };
  return (
    <Fragment>
      {activeStep === 0 && (
        <BasketCard
          cartData={cartData}
          token={token}
          nonce={nonce}
          onNext={handleNext}
          startTransition={startTransition}
        />
      )}
      {activeStep === 1 && (
        <SelectAddressForm
          addresses={addresses}
          token={token}
          customerId={customerId}
          cartData={cartData}
          nonce={nonce}
          onPrevious={handleBack}
          startTransition={startTransition}
        />
      )}
      <Backdrop
        sx={{
          zIndex: 10000,
          color: '#fff',
          flexDirection: 'column',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        open={isPending}
      >
        <CircularProgress />
      </Backdrop>
    </Fragment>
  );
};

export default OrderJourney;
