'use client';
import React, { useState } from 'react';
import Btn from './Button/CommonBtn';
import DialogBox from './Dialog/Dialog';
import { useRouter } from 'next/navigation';
import { Address, Cart } from '@/interfaces';
import { CreateOrder } from '@/libs/api-manager/manager';

const dialogBoxContent = {
  title: 'Order confirmed',
  subTitle: 'Thanks for your order!',
  description:
    'Please check your email for your order confirmation. We will send you a confirmation by email once your items have shipped.',
  buttonText: 'Home',
  isCrossIcon: true,
};
interface ConfirmOrderBtnProps {
  selectedAddress: Address | null;
  token: string;
  customerId: number;
  cartData: Cart;
  nonce: string;
}

const ConfirmOrderBtn: React.FC<ConfirmOrderBtnProps> = ({ selectedAddress, token, cartData, nonce, customerId }) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogBoxDataChange = (data: boolean) => {
    setIsDialogOpen(data);
    router.push('/');
  };

  const handleCreateOrder = async () => {
    const address = {
      first_name: selectedAddress?.first_name,
      last_name: selectedAddress?.last_name,
      address_1: selectedAddress?.address_line_1,
      address_2: selectedAddress?.address_line_2,
      city: selectedAddress?.city,
      state: selectedAddress?.state,
      postcode: selectedAddress?.postcode,
      country: selectedAddress?.country,
    };
    const orderDetails = {
      customer_id: customerId,
      status: 'request-status',
      set_paid: true,
      billing: {
        ...address,
        email: 'john.doe@example.com',
        phone: selectedAddress?.phone,
      },
      shipping: {
        ...address,
      },
      line_items: [
        {
          product_id: cartData.items[0].id,
          quantity: 1,
        },
      ],
      shipping_lines: [
        {
          method_id: 'free_shipping',
          method_title: 'Free Shipping',
          total: '00.00',
        },
      ],
    };
    await CreateOrder(orderDetails, token, nonce);
  };
  return (
    <>
      <Btn
        look="dark-filled"
        width="100%"
        fullWidth
        style={{ marginBottom: '25px' }}
        onClick={handleCreateOrder}
        disabled={selectedAddress === null}
      >
        Confirm Order
      </Btn>
      <DialogBox isDialogOpen={isDialogOpen} onDataChange={handleDialogBoxDataChange} content={dialogBoxContent} />
    </>
  );
};

export default ConfirmOrderBtn;
