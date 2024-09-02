'use client';
import React, { useState } from 'react';
import DialogConfirmBox from '@/components/Dialog/DialogConfirm';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { DeleteAddress } from '@/libs/api-manager/manager';
import UseToaster from '@/hooks/useToaster';
import Toaster from '@/components/Toaster';

interface DeleteAddressBtnProps {
  token: string;
  vipId: number;
  addressId: number;
  // eslint-disable-next-line no-unused-vars
  handleAddressList: (addressId: number) => void;
}
const DeleteAddressBtn: React.FC<DeleteAddressBtnProps> = ({ vipId, addressId, token, handleAddressList }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const toggleDialog = () => {
    setOpenDialog((prev) => !prev);
  };
  const deleteAddress = async (vipId: number, addressId: number, token: string) => {
    try {
      handleAddressList(addressId);
      await DeleteAddress(vipId, addressId, token);
      toggleDialog();
    } catch (error) {
      openToaster(error?.toString() ?? 'Error deleting address');
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
