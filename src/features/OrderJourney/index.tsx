'use client';
import React, { Fragment, useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Backdrop, CircularProgress } from '@mui/material';
import { Address, Cart } from '@/interfaces';
import BasketCard from '@/components/BasketCard';
import SelectAddressForm from '../SelectAddressForm';

interface OrderJourneyProps {
  addresses: Address[];
  cartData: Cart;
}

const OrderJourney: React.FC<OrderJourneyProps> = ({ addresses, cartData }) => {
  const searchParams = useSearchParams();
  const step = searchParams.get('step');
  const currentStep = step === '1' ? step : 0;
  const [activeStep, setActiveStep] = useState(Number(currentStep));
  const [isPending, startTransition] = useTransition();
  const isRequestedProduct = searchParams.get('isRequestOnly');
  const isLookbookOrder = searchParams.get('isLookbook');
  const router = useRouter();

  const handleNext = () => {
    startTransition(() => setActiveStep((prev) => prev + 1));
  };

  const handleBack = () => {
    if (isRequestedProduct || isLookbookOrder) {
      router.back();
    } else {
      setActiveStep((prev) => prev - 1);
    }
  };

  return (
    <Fragment>
      {activeStep === 0 && <BasketCard cartData={cartData} onNext={handleNext} startTransition={startTransition} />}
      {activeStep === 1 && (
        <SelectAddressForm
          addresses={addresses}
          cartData={cartData}
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
