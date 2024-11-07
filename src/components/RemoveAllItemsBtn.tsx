import React, { useState } from 'react';
import { Button } from '@mui/material';
import UseToaster from '@/hooks/useToaster';
import DialogConfirmBox from './Dialog/DialogConfirm';
import Toaster from './Toaster';
import { RemoveAllVipCartItems } from '@/libs/api-manager/manager';

interface RemoveAllItemsBtnProps {
  startTransition: typeof import('react').startTransition;
}

const RemoveAllItemsBtn: React.FC<RemoveAllItemsBtnProps> = ({ startTransition }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();

  const toggleDialog = () => {
    setOpenDialog((prev) => !prev);
  };
  const removeProduct = async () => {
    startTransition(async () => {
      try {
        await RemoveAllVipCartItems();
      } catch (error) {
        openToaster('Error : ' + String(error));
      } finally {
        setOpenDialog(false);
      }
    });
  };
  return (
    <>
      <Button color="error" className="button button--red" onClick={toggleDialog}>
        Remove all items
      </Button>
      <DialogConfirmBox
        open={openDialog}
        onClose={toggleDialog}
        onConfirm={() => removeProduct()}
        title="Remove all items From Cart"
        description="Are you sure you want to remove all items from the cart?"
      />
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity="error" />
    </>
  );
};

export default RemoveAllItemsBtn;
