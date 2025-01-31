'use client';
import React, { useState } from 'react';
import { get, isEmpty, map, some } from 'lodash';
import { Box, Button } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { Address, Cart } from '@/interfaces';
import { CreateOrder } from '@/libs/api-manager/manager';
import UseToaster from '@/hooks/useToaster';
import Toaster from './Toaster';
import { useLookbookOrder, useProductImageStore, useRequestOnlyStore, useUserInfoStore } from '@/store/useStore';
import { revalidateAllData } from '@/libs/actions';
import FullScreenDialog from './FullScreenDialog';
import { DefaultImageFallback } from '@/helpers/enums';
import en from '@/helpers/lang';

interface ConfirmOrderBtnProps {
  selectedAddress: Address | null;
  cartData: Cart;
  startTransition: typeof import('react').startTransition;
  vipId: number;
  signatureData: string;
}

const ConfirmOrderBtn: React.FC<ConfirmOrderBtnProps> = ({
  selectedAddress,
  cartData,
  startTransition,
  signatureData,
}) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const searchParams = useSearchParams();
  const isRequestedProduct = searchParams.get('isRequestOnly');
  const isLookbookOrder = searchParams.get('isLookbook');
  const postId = searchParams.get('postId');
  const { lookbookDescription, clearLookbookDescription } = useLookbookOrder();
  const {
    requestProductId,
    clearRequestProductId,
    clearQuestions,
    questions: requestOnlyQuestions,
    clearRequestESign,
    requestESign,
  } = useRequestOnlyStore();
  const { productImage } = useProductImageStore();
  const { userEmailStore } = useUserInfoStore();
  const cartItems = get(cartData, 'items', []);

  const dialogBoxContent = {
    title:
      isRequestedProduct || isLookbookOrder
        ? en.selectAddress.dialog.requestTitle
        : en.selectAddress.dialog.requestTitle,
    subTitle:
      isRequestedProduct || isLookbookOrder
        ? en.selectAddress.dialog.requestSubtitle
        : en.selectAddress.dialog.orderSubtitle,
    description:
      isRequestedProduct || isLookbookOrder ? en.selectAddress.dialog.requestDesc : en.selectAddress.dialog.orderDesc,
    image: isRequestedProduct || isLookbookOrder ? undefined : productImage || DefaultImageFallback.Placeholder,
    buttonText:
      isRequestedProduct || isLookbookOrder ? en.selectAddress.dialog.reqBtn : en.selectAddress.dialog.orderBtn,
  };

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
          key: 'post_id',
          value: postId,
        },
      ],
    }),
    ...(isRequestedProduct && {
      meta_data: [
        {
          key: 'e_signature',
          value: requestESign,
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
              questions: requestOnlyQuestions,
            },
          ]
        : map(cartData.items, (item) => ({
            product_id: item.id,
            quantity: 1,
            ...(item.questions ? { questions: item.questions } : {}),
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

  const handleCreateOrder = async () => {
    startTransition(async () => {
      if (!isLookbookOrder && isEmpty(orderDetails.line_items)) {
        openToaster(en.selectAddress.emptyError);
        setTimeout(() => {
          router.push('/home');
        }, 2000);
      } else {
        try {
          if (some(cartItems, 'is_high_end_item')) {
            const updatedOrderDetails = {
              ...orderDetails,
              ...(signatureData && {
                meta_data: [
                  ...(orderDetails.meta_data || []),
                  {
                    key: 'e_signature',
                    value: signatureData,
                  },
                ],
              }),
            };
            await CreateOrder(updatedOrderDetails);
          } else {
            await CreateOrder(orderDetails);
          }
          await revalidateAllData();
          setIsDialogOpen(true);
          clearLookbookDescription();
          clearRequestProductId();
          clearQuestions();
          clearRequestESign();
        } catch (error) {
          openToaster(error?.toString() ?? en.selectAddress.orderError);
        }
      }
    });
  };

  return (
    <>
      <Box display="flex" gap={3} justifyContent="flex-end">
        <Button className="button button--black" onClick={handleCreateOrder} disabled={selectedAddress === null}>
          {en.selectAddress.btnText}
        </Button>
      </Box>
      <FullScreenDialog
        isOpen={isDialogOpen}
        onClose={() => {
          if (isRequestedProduct || isLookbookOrder) {
            startTransition(() => {
              router.push('/home');
              setIsDialogOpen(false);
            });
          } else {
            startTransition(() => {
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
