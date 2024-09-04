import React from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import ContinueToCartBtn from '@/components/ContinueToCartBtn';
// import { useStore } from '@/store/useStore';
import './Basket.scss';
import { Cart } from '@/interfaces';
import DeleteItemFromCartBtn from '../DeleteItemFromCartBtn';
import he from 'he';

interface BasketCardProps {
  cartData: Cart;
  token: string;
}
const BasketCard: React.FC<BasketCardProps> = async ({ cartData, token }) => {
  const cartItems = cartData.items;
  // const { basket, removeProduct } = useStore();
  return (
    <Box className="basket-product__items">
      {cartItems.length > 0 ? (
        <>
          {cartItems.map((product) => (
            <Box className="basket-product__item" key={product.id}>
              <Image src={product.images[0].src} alt={product.name} height={110} width={110} />
              <Box className="product-info">
                <Typography gutterBottom variant="h2">
                  {he.decode(product.name)}
                </Typography>
                <Typography variant="body1">{he.decode(product.name)}</Typography>
                {product.type === 'variation' && (
                  <>
                    {product?.variation[0] && (
                      <Typography variant="body1">
                        {product?.variation[0].attribute}: {product?.variation[0].value}
                      </Typography>
                    )}
                    {product?.variation[1] && (
                      <Typography variant="body1">
                        {product?.variation[1].attribute}: {product?.variation[1].value}
                      </Typography>
                    )}
                  </>
                )}
              </Box>
              <DeleteItemFromCartBtn itemKey={product.key} token={token} />
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
