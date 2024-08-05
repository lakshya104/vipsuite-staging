'use client';
import React from 'react';
import Btn from './Button/CommonBtn';
import { useRouter } from 'next/navigation';

const ContinueToCartBtn = () => {
  const router = useRouter();
  const goToAddress = () => {
    router.push('/basket/address');
  };

  return (
    <Btn look="dark-filled" width="100%" fullWidth onClick={goToAddress}>
      Continue Order
    </Btn>
  );
};

export default ContinueToCartBtn;
