'use client';
import React, { useState } from 'react';
import Btn from './Button/CommonBtn';
import DialogBox from './Dialog/Dialog';
import { useRouter, useSearchParams } from 'next/navigation';
import { Address, Cart } from '@/interfaces';
import { CreateOrder } from '@/libs/api-manager/manager';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import UseToaster from '@/hooks/useToaster';
import Toaster from './Toaster';
import { map } from 'lodash';
import { revalidateTag } from '@/libs/actions';
import TAGS from '@/libs/apiTags';

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
  startTransition: typeof import('react').startTransition;
}

const ConfirmOrderBtn: React.FC<ConfirmOrderBtnProps> = ({
  selectedAddress,
  cartData,
  nonce,
  customerId,
  token,
  startTransition,
}) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const searchParams = useSearchParams();
  const requestProductId = searchParams.get('productId');
  const user = useCurrentUser();
  const userEmail = user?.email;
  const vipProfileId = user?.vip_profile_id;

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
      ...(requestProductId && { request_status: 'some_value' }),
      meta_data: [
        {
          key: 'vip_profile_id',
          value: vipProfileId,
        },
      ],
      set_paid: true,
      billing: {
        ...address,
        email: userEmail,
        phone: selectedAddress?.phone,
      },
      shipping: {
        ...address,
      },
      line_items: requestProductId
        ? {
            product_id: requestProductId,
            quantity: 1,
          }
        : map(cartData.items, (item) => ({
            product_id: item.id,
            quantity: 1,
          })),
      shipping_lines: [
        {
          method_id: 'free_shipping',
          method_title: 'Free Shipping',
          total: '00.00',
        },
      ],
    };
    console.log({ orderDetails });
    startTransition(async () => {
      try {
        await CreateOrder(orderDetails, token, nonce, vipProfileId);
        await revalidateTag(TAGS.GET_MYORDERS);
        setIsDialogOpen(true);
      } catch (error) {
        openToaster(error?.toString() ?? 'Error processing Order');
      }
    });
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
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity="error" />
    </>
  );
};

export default ConfirmOrderBtn;
