'use client';
import React from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ContinueToCartBtn from '@/components/ContinueToCartBtn';
import { useStore } from '@/store/useStore';
import './Basket.scss';

const BasketCard = () => {
  const { basket, removeProduct } = useStore();
  return (
    <Box className="basket-product__items">
      {basket.length > 0 ? (
        <>
          {basket.map((product) => (
            <Box className="basket-product__item" key={product.id}>
              <Image src={product.imageUrl} alt={product.name} height={110} width={110} />
              <Box className="product-info">
                <Typography gutterBottom variant="h2">
                  {product.category}
                </Typography>
                <Typography variant="body1">{product.name}</Typography>
                <Typography variant="body1">Size: {product.size}</Typography>
              </Box>
              <DeleteOutlinedIcon onClick={() => removeProduct(product.id)} />
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
