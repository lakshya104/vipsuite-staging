'use client';
import React, { useState } from 'react';
import { isEmpty, map } from 'lodash';
import Btn from './Button/CommonBtn';
import { useRouter, useSearchParams } from 'next/navigation';
import { Address, Cart } from '@/interfaces';
import { CreateOrder } from '@/libs/api-manager/manager';
import UseToaster from '@/hooks/useToaster';
import Toaster from './Toaster';
import { useLookbookOrder, useOrderStore, useRequestOnlyStore, useUserInfoStore } from '@/store/useStore';
import { revalidateAllData } from '@/libs/actions';
import FullScreenDialog from './FullScreenDialog';

interface ConfirmOrderBtnProps {
  selectedAddress: Address | null;
  cartData: Cart;
  startTransition: typeof import('react').startTransition;
  vipId: number;
  productImage: string;
}

const ConfirmOrderBtn: React.FC<ConfirmOrderBtnProps> = ({
  selectedAddress,
  cartData,
  startTransition,
  productImage,
}) => {
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

  const dialogBoxContent = {
    title: isRequestedProduct || isLookbookOrder ? 'Request Confirmed' : 'Order confirmed',
    subTitle: isRequestedProduct || isLookbookOrder ? 'Items Requested!' : 'Thanks for your order!',
    description:
      isRequestedProduct || isLookbookOrder
        ? 'Please check your email for your order confirmation. We will send you a confirmation once your request has been approved.'
        : 'Please check your email for your order confirmation. We will send you a confirmation by email once your items have shipped.',
    image: isRequestedProduct || isLookbookOrder ? undefined : productImage,
    buttonText: isRequestedProduct ? 'Home' : 'View My Orders',
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
        if (!isLookbookOrder && isEmpty(orderDetails.line_items)) {
          openToaster('Please select at least one product to order');
          setTimeout(() => {
            router.push('/home');
          }, 2000);
        } else {
          await CreateOrder(orderDetails);
          await revalidateAllData();
          increaseOrderCount();
          setIsDialogOpen(true);
          clearLookbookDescription();
          clearRequestProductId();
        }
      });
    } catch (error) {
      openToaster(error?.toString() ?? 'Error processing Order');
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
      <FullScreenDialog
        isOpen={isDialogOpen}
        onClose={() => {
          if (isRequestedProduct) {
            startTransition(async () => {
              router.push('/home');
              setIsDialogOpen(false);
            });
          } else {
            startTransition(async () => {
              router.push('/inbox?isOrderTab=true');
              setIsDialogOpen(false);
            });
          }
        }}
        content={dialogBoxContent}
      />
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity="error" />
    </>
  );
};

export default ConfirmOrderBtn;
