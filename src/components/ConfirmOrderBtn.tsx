'use client';
import React, { useState } from 'react';
import Btn from './Button/CommonBtn';
import DialogBox from './Dialog/Dialog';
import { useRouter, useSearchParams } from 'next/navigation';
import { Address, Cart } from '@/interfaces';
import { CreateOrder, RemoveAllVipCartItems } from '@/libs/api-manager/manager';
import UseToaster from '@/hooks/useToaster';
import Toaster from './Toaster';
import { map } from 'lodash';
import { revalidateTag } from '@/libs/actions';
import TAGS from '@/libs/apiTags';
import { useLookbookOrder, useOrderStore, useRequestOnlyStore, useUserInfoStore } from '@/store/useStore';

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
  cartData: Cart;
  nonce: string;
  startTransition: typeof import('react').startTransition;
  vipId: number;
}

const ConfirmOrderBtn: React.FC<ConfirmOrderBtnProps> = ({
  selectedAddress,
  cartData,
  nonce,
  token,
  startTransition,
  vipId,
}) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const searchParams = useSearchParams();
  const isRequestedProduct = searchParams.get('isRequestOnly');
  const isLookbookOrder = searchParams.get('isLookbook');
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
        ],
      }),
      set_paid: true,
      billing: {
        ...address,
        email: userEmailStore,
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
        await CreateOrder(orderDetails, token, nonce, vipId);
        increaseOrderCount();
        setIsDialogOpen(true);
        clearLookbookDescription();
        clearRequestProductId();
      });
    } catch (error) {
      openToaster(error?.toString() ?? 'Error processing Order');
    } finally {
      if (!isRequestedProduct && !isLookbookOrder) {
        await RemoveAllVipCartItems(token, nonce);
      }
      await revalidateTag(TAGS.GET_MYORDERS);
      await revalidateTag(TAGS.GET_VIP_CART);
    }
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
