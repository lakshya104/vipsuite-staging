import React from 'react';
import { GetBrandProductDetail, GetNonce } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import ProductDetailsContainer from '@/components/ProductDetailsContainer';

interface ProductDetailsPageProps {
  productId: number;
}

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = async ({ productId }) => {
  const nonce = await GetNonce();
  const product = await GetBrandProductDetail(productId);
  if (!product || !nonce) {
    return <ErrorFallback errorMessage="Not able to show product details currently." />;
  }
  return <ProductDetailsContainer product={product} nonce={nonce} />;
};

export default ProductDetailsPage;
