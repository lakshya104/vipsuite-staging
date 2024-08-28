'use client';
import React from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { RemoveVipCartItem } from '@/libs/api-manager/manager';
import { useRouter } from 'next/navigation';

interface DeleteItemFromCartBtnProps {
  itemKey: string;
  token: string;
}
const DeleteItemFromCartBtn: React.FC<DeleteItemFromCartBtnProps> = ({ itemKey, token }) => {
  const router = useRouter();
  const removeProduct = () => {
    RemoveVipCartItem(itemKey, token);
    router.refresh();
  };
  return <DeleteOutlinedIcon sx={{ cursor: 'pointer' }} onClick={removeProduct} />;
};

export default DeleteItemFromCartBtn;
