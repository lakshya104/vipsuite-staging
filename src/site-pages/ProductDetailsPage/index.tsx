import React from 'react';
import { GetBrandProductDetail } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import ProductDetailsContainer from '@/components/ProductDetailsContainer';
import ErrorHandler from '@/components/ErrorHandler';
import { isUndefined } from 'lodash';

interface ProductDetailsPageProps {
  productId: number;
}

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = async ({ productId }) => {
  const { data: product, error } = await GetBrandProductDetail(productId);
  if (error) {
    return <ErrorHandler error={error} errMessage="Not able to show product details currently." />;
  }
  if (!product || isUndefined(product)) {
    return <ErrorFallback errorMessage="Not able to show product details currently." />;
  }
  return <ProductDetailsContainer product={product} />;
};

export default ProductDetailsPage;
