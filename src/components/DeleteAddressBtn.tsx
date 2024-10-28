'use client';
import React, { useState } from 'react';
import DialogConfirmBox from '@/components/Dialog/DialogConfirm';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { DeleteAddress } from '@/libs/api-manager/manager';
import UseToaster from '@/hooks/useToaster';
import Toaster from '@/components/Toaster';
import { revalidateTag } from '@/libs/actions';
import TAGS from '@/libs/apiTags';

interface DeleteAddressBtnProps {
  addressId: string;
  startTransition: typeof import('react').startTransition;
}

const DeleteAddressBtn: React.FC<DeleteAddressBtnProps> = ({ addressId, startTransition }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [toasterType, setToasterType] = useState<'error' | 'success' | 'warning' | 'info'>('success');
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const toggleDialog = () => {
    setOpenDialog((prev) => !prev);
  };
  const deleteAddress = async (addressId: string) => {
    startTransition(async () => {
      try {
        const res = await DeleteAddress(addressId);
        setToasterType('success');
        openToaster(res?.message);
      } catch (error) {
        setToasterType('error');
        openToaster(error?.toString() ?? 'Error deleting address');
      } finally {
        setOpenDialog(false);
        await revalidateTag(TAGS.GET_ADDRESSES);
      }
    });
  };

  return (
    <>
      <DeleteOutlinedIcon onClick={toggleDialog} />
      <DialogConfirmBox
        open={openDialog}
        onClose={toggleDialog}
        onConfirm={() => deleteAddress(addressId)}
        title="Delete Address"
        description={'Are you sure you want to delete the address?'}
      />
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity={toasterType} />
    </>
  );
};

export default DeleteAddressBtn;
