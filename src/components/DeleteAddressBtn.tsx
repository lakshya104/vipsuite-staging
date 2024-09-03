'use client';
import React, { useState } from 'react';
import DialogConfirmBox from '@/components/Dialog/DialogConfirm';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { DeleteAddress } from '@/libs/api-manager/manager';
import UseToaster from '@/hooks/useToaster';
import Toaster from '@/components/Toaster';
import { useRouter } from 'next/navigation';

interface DeleteAddressBtnProps {
  token: string;
  vipId: number;
  addressId: number;
  startTransition: typeof import('react').startTransition;
}

const DeleteAddressBtn: React.FC<DeleteAddressBtnProps> = ({ vipId, addressId, token, startTransition }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const router = useRouter();
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const toggleDialog = () => {
    setOpenDialog((prev) => !prev);
  };
  const deleteAddress = async (vipId: number, addressId: number, token: string) => {
    try {
      startTransition(async () => {
        await DeleteAddress(vipId, addressId, token);
        router.refresh();
      });
    } catch (error) {
      openToaster(error?.toString() ?? 'Error deleting address');
    } finally {
      setOpenDialog(false);
    }
  };

  return (
    <>
      <DeleteOutlinedIcon onClick={toggleDialog} />
      <DialogConfirmBox
        open={openDialog}
        onClose={toggleDialog}
        onConfirm={() => deleteAddress(vipId, addressId, token)}
        title="Delete Address"
        description={'Are you sure you want to delete the address?'}
      />
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity="error" />
    </>
  );
};

export default DeleteAddressBtn;
