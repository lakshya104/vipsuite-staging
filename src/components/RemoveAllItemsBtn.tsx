import React, { useState } from 'react';
import { Button } from '@mui/material';
import UseToaster from '@/hooks/useToaster';
import DialogConfirmBox from './Dialog/DialogConfirm';
import Toaster from './Toaster';
import { revalidateTag } from '@/libs/actions';
import { RemoveAllVipCartItems } from '@/libs/api-manager/manager';

interface RemoveAllItemsBtnProps {
  token: string;
  nonce: string;
  startTransition: typeof import('react').startTransition;
}

const RemoveAllItemsBtn: React.FC<RemoveAllItemsBtnProps> = ({ token, nonce, startTransition }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();

  const toggleDialog = () => {
    setOpenDialog((prev) => !prev);
  };
  const removeProduct = async (token: string, nonce: string) => {
    startTransition(async () => {
      try {
        await RemoveAllVipCartItems(token, nonce);
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
      <Button
        color="error"
        className='button button--red'
        onClick={toggleDialog}
      >
        Remove all items
      </Button>
      <DialogConfirmBox
        open={openDialog}
        onClose={toggleDialog}
        onConfirm={() => removeProduct(token, nonce)}
        title="Delete Product From Cart"
        description="Are you sure you want to delete this product from the cart?"
      />
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity="error" />
    </>
  );
};

export default RemoveAllItemsBtn;
