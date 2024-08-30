'use client';
import React, { useState } from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { RemoveVipCartItem } from '@/libs/api-manager/manager';
import { useRouter } from 'next/navigation';
import { Backdrop, Box, LinearProgress } from '@mui/material';
import Toaster from './Toaster';
import UseToaster from '@/hooks/useToaster';

interface DeleteItemFromCartBtnProps {
  itemKey: string;
  token: string;
}
const DeleteItemFromCartBtn: React.FC<DeleteItemFromCartBtnProps> = ({ itemKey, token }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const router = useRouter();
  const removeProduct = async () => {
    setIsLoading(true);
    try {
      await RemoveVipCartItem(itemKey, token);
    } catch (error) {
      openToaster('Error during removing product. ' + error);
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  };

  return (
    <>
      <DeleteOutlinedIcon sx={{ cursor: 'pointer' }} onClick={removeProduct} />
      <Backdrop
        sx={{
          zIndex: 10000,
          color: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        open={isLoading}
      >
        <Box sx={{ textAlign: 'center', color: 'black' }}>
          Removing Product...
          <LinearProgress />
        </Box>
      </Backdrop>
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity="error" />
    </>
  );
};

export default DeleteItemFromCartBtn;
