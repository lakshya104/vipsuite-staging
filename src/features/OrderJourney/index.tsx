'use client';
import React, { Fragment, useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Backdrop, CircularProgress } from '@mui/material';
import { first, get } from 'lodash';
import { Address, Cart } from '@/interfaces';
import BasketCard from '@/components/BasketCard';
import SelectAddressForm from '../SelectAddressForm';
import { DefaultImageFallback } from '@/helpers/enums';

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
  const [signatureData, setSignatureData] = useState<string>('');
  const firstItemImageUrl = first(get(cartData, 'items', []))?.image_url;

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
  const handleSignature = (signature: string) => {
    setSignatureData(signature);
  };

  return (
    <Fragment>
      {activeStep === 0 && (
        <BasketCard
          cartData={cartData}
          onNext={handleNext}
          startTransition={startTransition}
          handleSignature={handleSignature}
          productImage={firstItemImageUrl || DefaultImageFallback.Placeholder}
        />
      )}
      {activeStep === 1 && (
        <SelectAddressForm
          addresses={addresses}
          cartData={cartData}
          onPrevious={handleBack}
          startTransition={startTransition}
          signatureData={signatureData}
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
