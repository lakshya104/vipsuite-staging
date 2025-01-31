'use client';
import React, { useState } from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { RemoveVipCartItem } from '@/libs/api-manager/manager';
import Toaster from './Toaster';
import UseToaster from '@/hooks/useToaster';
import DialogConfirmBox from './Dialog/DialogConfirm';
import revalidatePathAction from '@/libs/actions';
import en from '@/helpers/lang';

interface DeleteItemFromCartBtnProps {
  productId: number;
  startTransition: typeof import('react').startTransition;
}

const DeleteItemFromCartBtn: React.FC<DeleteItemFromCartBtnProps> = ({ productId, startTransition }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();

  const toggleDialog = () => {
    setOpenDialog((prev) => !prev);
  };
  const removeProduct = async (productId: number) => {
    startTransition(async () => {
      try {
        await RemoveVipCartItem(productId);
        await revalidatePathAction('/basket');
      } catch (error) {
        openToaster('Error : ' + String(error));
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
