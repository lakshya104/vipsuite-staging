'use client';
import React, { useState } from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { RemoveVipCartItem } from '@/libs/api-manager/manager';
import Toaster from './Toaster';
import UseToaster from '@/hooks/useToaster';
import DialogConfirmBox from './Dialog/DialogConfirm';
import revalidatePathAction from '@/libs/actions';
import en from '@/helpers/lang';
import { paths } from '@/helpers/paths';

interface DeleteItemFromCartBtnProps {
  productId: number;
  startTransition: typeof import('react').startTransition;
  opportunityId: string;
}

const DeleteItemFromCartBtn: React.FC<DeleteItemFromCartBtnProps> = ({ productId, startTransition, opportunityId }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();

  const toggleDialog = () => {
    setOpenDialog((prev) => !prev);
  };
  const removeProduct = async (productId: number) => {
    startTransition(async () => {
      try {
        const payload = { opportunity_id: opportunityId };
        await RemoveVipCartItem(productId, payload);
        await revalidatePathAction(paths.root.basket.getHref());
      } catch (error) {
        openToaster(String(error));
      } finally {
        setOpenDialog(false);
      }
    });
  };

  return (
    <>
      <DeleteOutlinedIcon sx={{ cursor: 'pointer' }} className="basket-product__delete" onClick={toggleDialog} />
      <DialogConfirmBox
        open={openDialog}
        onClose={toggleDialog}
        onConfirm={() => removeProduct(productId)}
        title={en.basket.deleteTitle}
        description={en.basket.deleteDesc}
      />
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity="error" />
    </>
  );
};

export default DeleteItemFromCartBtn;
