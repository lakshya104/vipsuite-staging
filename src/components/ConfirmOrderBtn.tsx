'use client';
import React, { useState } from 'react';
import Btn from './Button/CommonBtn';
import DialogBox from './Dialog/Dialog';
import { useRouter } from 'next/navigation';

const dialogBoxContent = {
  title: 'Order confirmed',
  subTitle: 'Thanks for your order!',
  description:
    'Please check your email for your order confirmation. We will send you a confirmation by email once your items have shipped.',
  buttonText: 'Home',
  isCrossIcon: true,
};

const ConfirmOrderBtn = () => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogBoxDataChange = (data: boolean) => {
    setIsDialogOpen(data);
    router.push('/');
  };
  return (
    <>
      <Btn look="dark-filled" width="100%" fullWidth onClick={() => setIsDialogOpen(true)}>
        Confirm Order
      </Btn>
      <DialogBox isDialogOpen={isDialogOpen} onDataChange={handleDialogBoxDataChange} content={dialogBoxContent} />
    </>
  );
};

export default ConfirmOrderBtn;
