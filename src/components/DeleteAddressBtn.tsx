'use client';
import React, { useState } from 'react';
import DialogConfirmBox from '@/components/Dialog/DialogConfirm';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { DeleteAddress } from '@/libs/api-manager/manager';
import UseToaster from '@/hooks/useToaster';
import Toaster from '@/components/Toaster';
import en from '@/helpers/lang';
import revalidatePathAction from '@/libs/actions';
import { paths } from '@/helpers/paths';

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
        await revalidatePathAction(paths.root.addresses.getHref());
      } catch (error) {
        setToasterType('error');
        openToaster(error?.toString() ?? en.deleteAddressBtn.errMessage);
      } finally {
        setOpenDialog(false);
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
        title={en.deleteAddressBtn.title}
        description={en.deleteAddressBtn.description}
      />
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity={toasterType} />
    </>
  );
};

export default DeleteAddressBtn;
