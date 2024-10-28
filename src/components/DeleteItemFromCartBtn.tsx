'use client';
import React, { useState } from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { RemoveVipCartItem } from '@/libs/api-manager/manager';
import Toaster from './Toaster';
import UseToaster from '@/hooks/useToaster';
import { revalidateTag } from '@/libs/actions';
import DialogConfirmBox from './Dialog/DialogConfirm';

interface DeleteItemFromCartBtnProps {
  itemKey: string;
  nonce: string;
  startTransition: typeof import('react').startTransition;
}

const DeleteItemFromCartBtn: React.FC<DeleteItemFromCartBtnProps> = ({ itemKey, nonce, startTransition }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();

  const toggleDialog = () => {
    setOpenDialog((prev) => !prev);
  };
  const removeProduct = async (itemKey: string, nonce: string) => {
    startTransition(async () => {
      try {
        await RemoveVipCartItem(itemKey, nonce);
        await revalidateTag('getVipCart');
      } catch (error) {
        openToaster('Error : ' + String(error));
      } finally {
        setOpenDialog(false);
      }
    });
  };

  return (
    <>
      <DeleteOutlinedIcon sx={{ cursor: 'pointer' }} onClick={toggleDialog} />
      <DialogConfirmBox
        open={openDialog}
        onClose={toggleDialog}
        onConfirm={() => removeProduct(itemKey, nonce)}
        title="Delete Product From Cart"
        description="Are you sure you want to delete this product from the cart?"
      />
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity="error" />
    </>
  );
};

export default DeleteItemFromCartBtn;
