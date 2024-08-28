'use client';
import React from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ContinueToCartBtn from '@/components/ContinueToCartBtn';
// import { useStore } from '@/store/useStore';
import './Basket.scss';
import { Cart } from '@/interfaces';

interface BasketCardProps {
  cartData: Cart;
}
const BasketCard: React.FC<BasketCardProps> = ({ cartData }) => {
  const cartItems = cartData.items;
  // const { basket, removeProduct } = useStore();
  return (
    <Box className="basket-product__items">
      {cartItems.length > 0 ? (
        <>
          {cartItems.map((product) => (
            <Box className="basket-product__item" key={product.id}>
              <Image src="/img/product_1.jpg" alt={product.name} height={110} width={110} />
              <Box className="product-info">
                <Typography gutterBottom variant="h2">
                  {product.name}
                </Typography>
                <Typography variant="body1">{product.name}</Typography>
                {product.type === 'variation' && (
                  <Typography variant="body1">
                    {product?.variation[0].attribute}: {product?.variation[0].value}
                  </Typography>
                )}
              </Box>
              <DeleteOutlinedIcon onClick={() => {}} />
            </Box>
          ))}
          <ContinueToCartBtn />
        </>
      ) : (
        <Typography textAlign="center">No results found</Typography>
      )}
    </Box>
  );
};

export default BasketCard;
