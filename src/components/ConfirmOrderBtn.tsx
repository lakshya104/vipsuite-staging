'use client';
import React, { useState } from 'react';
import { map } from 'lodash';
import Btn from './Button/CommonBtn';
import DialogBox from './Dialog';
import { useRouter, useSearchParams } from 'next/navigation';
import { Address, Cart } from '@/interfaces';
import { CreateOrder } from '@/libs/api-manager/manager';
import UseToaster from '@/hooks/useToaster';
import Toaster from './Toaster';
import { useLookbookOrder, useOrderStore, useRequestOnlyStore, useUserInfoStore } from '@/store/useStore';
import revalidatePathAction from '@/libs/actions';

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
  cartData: Cart;
  startTransition: typeof import('react').startTransition;
  vipId: number;
}

const ConfirmOrderBtn: React.FC<ConfirmOrderBtnProps> = ({ selectedAddress, cartData, startTransition }) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const searchParams = useSearchParams();
  const isRequestedProduct = searchParams.get('isRequestOnly');
  const isLookbookOrder = searchParams.get('isLookbook');
  const brandId = searchParams.get('brandId');
  const { increaseOrderCount } = useOrderStore();
  const { lookbookDescription, clearLookbookDescription } = useLookbookOrder();
  const { requestProductId, clearRequestProductId } = useRequestOnlyStore();
  const { userEmailStore } = useUserInfoStore();

  const handleDialogBoxDataChange = (data: boolean) => {
    setIsDialogOpen(data);
    router.push('/home');
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
      ...(isRequestedProduct && { status: 'request-only' }),
      ...(isLookbookOrder && { status: 'lookbook-order' }),
      ...(isLookbookOrder && {
        meta_data: [
          {
            key: 'lookbook_order_data',
            value: lookbookDescription,
          },
          {
            key: 'brand_id',
            value: brandId,
          },
        ],
      }),
      set_paid: true,
      billing: {
        ...address,
        email: userEmailStore ?? '',
        phone: selectedAddress?.phone,
      },
      shipping: {
        ...address,
      },
      ...(!isLookbookOrder && {
        line_items: requestProductId
          ? [
              {
                product_id: requestProductId,
                quantity: 1,
              },
            ]
          : map(cartData.items, (item) => ({
              product_id: item.id,
              quantity: 1,
            })),
      }),
      shipping_lines: [
        {
          method_id: 'free_shipping',
          method_title: 'Free Shipping',
          total: '00.00',
        },
      ],
    };
    try {
      startTransition(async () => {
        await CreateOrder(orderDetails);
        await revalidatePathAction('/basket');
        increaseOrderCount();
        setIsDialogOpen(true);
        clearLookbookDescription();
        clearRequestProductId();
      });
    } catch (error) {
      openToaster(error?.toString() ?? 'Error processing Order');
    }
    // finally {
    //   if (!isRequestedProduct && !isLookbookOrder) {
    //     await RemoveAllVipCartItems();
    //   }
    // }
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
