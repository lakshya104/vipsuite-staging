'use client';
import React, { useState } from 'react';
import { get, isEmpty, map, some } from 'lodash';
import { Box, Button } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { Address, Cart } from '@/interfaces';
import { CreateOrder } from '@/libs/api-manager/manager';
import UseToaster from '@/hooks/useToaster';
import Toaster from './Toaster';
import { useLookbookOrder, useProductImageStore, useRequestOnlyStore } from '@/store/useStore';
import { revalidateAllData } from '@/libs/actions';
import FullScreenDialog from './FullScreenDialog';
import { DefaultImageFallback, UserRole } from '@/helpers/enums';
import en from '@/helpers/lang';
import { paths, withSearchParams } from '@/helpers/paths';

interface ConfirmOrderBtnProps {
  selectedAddress: Address | null;
  cartData: Cart;
  startTransition: typeof import('react').startTransition;
  signatureData: string;
  userRole: UserRole | null;
  userEmail: string | null;
}

const ConfirmOrderBtn: React.FC<ConfirmOrderBtnProps> = ({
  selectedAddress,
  cartData,
  startTransition,
  signatureData,
  userEmail,
  userRole,
}) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const searchParams = useSearchParams();
  const isRequestedProduct = searchParams.get('isRequestOnly');
  const isLookbookOrder = searchParams.get('isLookbook');
  const postId = searchParams.get('postId');
  const { lookbookDescription, agentVipInfo: agentVipLookbookInfo, clearLookbookData } = useLookbookOrder();
  const {
    requestProductId,
    opportunityId,
    clearRequestProductId,
    clearQuestions,
    questions: requestOnlyQuestions,
    clearRequestESign,
    requestESign,
    agentVipInfo,
  } = useRequestOnlyStore();
  const { productImage } = useProductImageStore();
  const cartItems = get(cartData, 'items', []);
  const isUserAgent = userRole === UserRole.Agent;

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
    buttonText: en.selectAddress.dialog.orderBtn,
  };

  const address = {
    first_name: selectedAddress?.first_name,
    last_name: selectedAddress?.last_name,
    address_1: selectedAddress?.address_line_1,
    address_2: selectedAddress?.address_line_2,
    city: selectedAddress?.city,
    state: selectedAddress?.state,
    postcode: selectedAddress?.postcode,
    country: selectedAddress?.country_code,
  };

  const orderDetails = {
    ...(isRequestedProduct && { status: 'request-only' }),
    ...(isLookbookOrder && { status: 'lookbook-order' }),
    ...(isLookbookOrder && {
      order_by: userRole && userRole,
      ...(isUserAgent && {
        vip_profile_ids: agentVipLookbookInfo?.vip_profile_ids || null,
        vip_profile_names: agentVipLookbookInfo?.vip_profile_names || null,
      }),
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
      email: userEmail ?? '',
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
              opportunity_id: opportunityId,
              order_by: userRole && userRole,
              ...(isUserAgent && {
                vip_profile_ids: agentVipInfo?.vip_profile_ids || null,
                vip_profile_names: agentVipInfo?.vip_profile_names || null,
              }),
            },
          ]
        : map(cartData.items, (item) => ({
            product_id: item.id,
            quantity: 1,
            opportunity_id: item.opportunity_id,
            order_by: userRole && userRole,
            ...(item.questions ? { questions: item.questions } : {}),
            ...(isUserAgent && {
              vip_profile_ids: item?.vip_profile_ids || null,
              vip_profile_names: item?.vip_profile_names || null,
            }),
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
      if ((!isLookbookOrder && isEmpty(orderDetails.line_items)) || (isLookbookOrder && !lookbookDescription)) {
        openToaster(en.selectAddress.emptyError);
        setTimeout(() => {
          router.push(paths.root.home.getHref());
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
        } catch (error) {
          openToaster(error?.toString() ?? en.selectAddress.orderError);
        } finally {
          clearLookbookData();
          clearRequestProductId();
          clearQuestions();
          clearRequestESign();
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
          startTransition(() => {
            router.push(withSearchParams(() => paths.root.inbox.getHref(), { isOrderTab: 'true' }));
            setIsDialogOpen(false);
          });
        }}
        content={dialogBoxContent}
      />
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity="error" />
    </>
  );
};

export default ConfirmOrderBtn;
