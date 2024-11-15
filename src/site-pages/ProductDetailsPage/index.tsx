import React from 'react';
import { GetBrandProductDetail } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import ProductDetailsContainer from '@/components/ProductDetailsContainer';
import ErrorHandler from '@/components/ErrorHandler';

interface ProductDetailsPageProps {
  productId: number;
}

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = async ({ productId }) => {
  try {
    const product = await GetBrandProductDetail(productId);
    if (!product) {
      return <ErrorFallback errorMessage="Not able to show product details currently." />;
    }
    return <ProductDetailsContainer product={product} />;
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to show product details currently." />;
  }
};

export default ProductDetailsPage;
